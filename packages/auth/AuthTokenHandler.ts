import { Request } from "express";
import Token, { IToken } from "./models/Token";
import { IUser } from "../../app/models/User";

export class AuthTokenHandler {

    /**
     * The key used to identify the request token
     */
    private static readonly tokenName: string = '_token';

    /**
     * Hours after which the token has to be expired.
     * Default value is 24.
     */
    private expiry: number = 24;

    private readonly request: Request;

    /**
     * Creates a new token handler.
     * 
     * @param request Current express request
     * @param expiry Optional argument for changing the token expiry hours
     */
    constructor(request: Request, expiry?: number) {
        this.request = request;

        this.setExpiryHours(expiry || this.expiry);
    }

    /**
     * Sets the token expiry hours setting. All api access tokens
     * are set to expire after 24 hours by default. To change this default
     * setting, either call this function or set the expiry parameter
     * when constructing this TkenHandler.
     * 
     * @param hours Hours after which the token expires
     */
    public setExpiryHours(hours: number): void {
        if (hours && typeof hours === 'number') {
            this.expiry = hours;
        }
    }

    /**
     * Creates and saves a new token in the database. 
     * All the API authorizations are done via this token. 
     * 
     * If a user value is not given, the token will be a general 
     * session token with no user attached to it. This same token
     * can be assigned a user when login request is made.
     * 
     * @param user The user Document for which a new token has to
     *             be issued.
     */
    public async issueNewToken(user: IUser | null): Promise<IToken> {

        user = user instanceof Document ? user : null;

        let token: IToken = new Token({
            user: user
        });
        // Save the token and return the newly created
        // token. This document will have the _id field in it.
        //
        // If the save failed, an exception will be thrown.
        token = await token.save();

        return token;
    }

    /**
     * Gets the user document populated token document
     * from the database, if a token string is present in
     * the request.
     * 
     * If no token is present in the request, a null value is
     * returned.
     */
    public async getToken(): Promise<IToken | null> {
        let token = this.getTokenFromRequest();

        if (token != null) {
            return await Token.findOne({ token: token }).populate('user').exec();
        }
        return null;
    }

    /**
     * Gets the token from the request. A request will either
     * have token attached to its cookies or in the GET query
     * or in the POST data or in Authorization header.
     * 
     * If a token is not found return null
     */
    public getTokenFromRequest(): string | null {

        let token =
            // Check the request cookies for the presence of token.
            this.request.cookies[AuthTokenHandler.tokenName]
            // Check the request signed cookies for the token.
            || this.request.signedCookies[AuthTokenHandler.tokenName]
            // Check the request query parameters for the token.
            || this.request.query[AuthTokenHandler.tokenName]
            // Check the request body or post fields for the token.
            || this.request.body[AuthTokenHandler.tokenName]

        if (token) {
            return token;
        }
        // If token is not found on the above request fields,
        // look for them in the Authorization bearer header.

        return this.getTokenFromBearer();
    }

    /**
     * Checks the request for Authorization:Bearer header and returns
     * the token if it exists or returns null
     * 
     * @return string|null
     */
    private getTokenFromBearer(): string | null {
        let auth_header = this.request.get('Authorization');

        if (auth_header && auth_header.startsWith('Bearer ')) {
            return auth_header.substring(7).trim() || null;
        }
        return null;
    }
}