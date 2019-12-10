import { RequestHandler } from "express";

export default interface iRouteHandler {
    action(callback: RequestHandler | RequestHandler[], routeMiddlewares?: RequestHandler[]): RequestHandler[];
}