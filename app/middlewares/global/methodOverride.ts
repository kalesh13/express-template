import { RequestHandler } from "express";

/**
 * Determines if a _method field is a valid http method
 * or not.
 * 
 * @param method Method string to check.
 */
function isAValidMethod(method: string) {
    let valid_methods = ["get", "post", "put", "patch", "delete", "head"];

    return method && valid_methods.includes(method.toString().toLowerCase());
}

// Updates the request method if there is a 
// "_method" field present in the request query or
// request body.
const methodOverride: RequestHandler = function (req, res, next) {

    // Validate if the method obtained from query is
    // valid or not.
    if (isAValidMethod(req.query._method)) {
        req.method = req.query._method.toString().toLowerCase();
    }
    // Validate if the method obtained from body/payload is
    // valid or not.
    else if (isAValidMethod(req.body._method)) {
        req.method = req.body._method.toString().toLowerCase();
    }

    // Carry forward the request to next middleware
    return next();
};

export default methodOverride;