import { RequestHandler } from "express";
import { EmptyStrings } from "../classes/EmptyStrings";

// 
// Middleware to set null value to request fields.
//
const nullEmptyStrings: RequestHandler = function (req, res, next) {

    // Set empty string fields to null.
    new EmptyStrings().handle(req);
    
    // Carry forward the request to next 
    // middleware
    return next();
};

export default nullEmptyStrings;