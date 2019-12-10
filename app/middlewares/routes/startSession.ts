import { RequestHandler } from "express";

// Generates a web session. We will stick with database
// session for all our apps. So a database session model
// is required.
const startSession: RequestHandler = function (req, res, next) {

    return next();
}

export default startSession;