import { RequestHandler } from "express";

const throttleRequests: RequestHandler = function (req, res, next) {

    return next();
}

export default throttleRequests;