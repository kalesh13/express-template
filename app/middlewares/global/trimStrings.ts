import { RequestHandler } from "express";
import { TrimStrings } from "../classes/TrimStrings";

// 
// Middleware to trim the request fields.
//
const trimStrings: RequestHandler = function (req, res, next) {

    // Trim the request fields.
    new TrimStrings().handle(req);

    // Carry forward the request to next 
    // middleware
    return next();
};

export default trimStrings;