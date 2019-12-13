import { RequestHandler } from "express";
import config from "../../../config";

// Middleware to check whether the application has
// gone to maintenance mode or not.
//
// Read the config file and send 503 response, if the
// maintenance mode is set
const maintenanceMiddleware: RequestHandler = function (req, res, next) {

    if (config.maintenance) {
        return res.status(503).send({
            message: "We are undergoing a scheduled maintenance. Please try again later."
        });
    }
    // Carry forward the request to next middleware
    return next();
};

export default maintenanceMiddleware;