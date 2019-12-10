import { RequestHandler } from "express";

// Make csrf tokens available to all the views
// by adding it to response locals._token variable.
//
// Thus views can access the variable by just calling _token.
const csrfToLocals: RequestHandler = function (req, res, next) {
    res.locals._token = req.csrfToken();

    return next();
}

export default csrfToLocals;