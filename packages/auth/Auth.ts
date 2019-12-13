import { Request } from "express";
import { AuthTokenHandler } from "./AuthTokenHandler";
import { IUser } from "../../app/models/User";
import config from "../../config";

export class Auth {

    private readonly request: Request;

    /**
     * Creates a new authentication handler.
     * 
     * @param request Current express request
     */
    constructor(request: Request) {
        this.request = request;
    }

    /**
     * Checks if the request is from a logged in user
     * or not. Returns true if a logged in user is found.
     * 
     * @return boolean
     */
    public check(): boolean {
        let user = this.user();

        return user != null;
    }

    /**
     * Returns a logged in user model or return null if the
     * request is not from logged in user.
     * 
     * @returns 
     */
    public async user(): Promise<IUser | null> {
        let user_model = config.user_model;

        if (user_model) {
            let token = await new AuthTokenHandler(this.request).getToken();

            if (token != null) {
                return token.user;
            }
        }
        return null;
    }

    public login() {

    }

    public logout() {

    }
}