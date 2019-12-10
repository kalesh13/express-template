import iRouteHandler from "./iRouteHandler";
import { RequestHandler } from "express";
import apiMiddlewares from "../../app/middlewares/api";

export class ApiRouteHandler implements iRouteHandler {

    /**
     * Get the api specific route middlewares.
     * 
     * @param callback 
     * @param routeMiddlewares 
     */
    public action(callback: RequestHandler | RequestHandler[], routeMiddlewares?: RequestHandler[]): RequestHandler[] {

        // If callback is not an array, wrap it in an
        // array
        if (!Array.isArray(callback)) {
            callback = [callback];
        }
        return apiMiddlewares.concat(routeMiddlewares || [], callback);
    }
}