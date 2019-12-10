import iRouteHandler from "./iRouteHandler";
import { RequestHandler } from "express";
import webMiddlewares from "../../app/middlewares/web";

export class WebRouteHandler implements iRouteHandler {

    /**
     * Get the web route specific middlewares.
     * 
     * @param callback Final callback
     * @param routeMiddlewares Route specific middlewares
     */
    public action(callback: RequestHandler | RequestHandler[], routeMiddlewares?: RequestHandler[]): RequestHandler[] {

        // If callback is not an array, wrap it in an
        // array
        if (!Array.isArray(callback)) {
            callback = [callback];
        }
        return webMiddlewares.concat(routeMiddlewares || [], callback);
    }
}