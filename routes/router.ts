import express, { Express, ErrorRequestHandler, Router } from "express";
import { WebRouteHandler } from "./classes/WebRoutesHandler";
import { ApiRouteHandler } from "./classes/ApiRoutesHandler";
import { HomeController } from '../app/controllers/HomeController';
import iRegistrar from "./contracts/iRegistrars";
import createError from 'http-errors';

export class RouteRegister implements iRegistrar {
    /**
     * The application errorHandler function. All the errors
     * are handled by this function. Error stack will be 
     * made available on development. Checks whether the request
     * requires json output or not and sends json response or 
     * renders the error view.
     */
    private errorHandler: ErrorRequestHandler = function (err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);

        //TODO JSON check
        return res.render('error');
    };

    /**
     * Registers all the routes to the express. Routes are 
     * 
     * @param app Current Express instance
     */
    public register(app: Express): void {

        const router: Router = express.Router();

        const webRoute: WebRouteHandler = new WebRouteHandler();
        const apiRoute: ApiRouteHandler = new ApiRouteHandler();

        //==========================================
        // Homepage Routes
        //===========================================
        const homeController: HomeController = new HomeController();
        router.get('/', webRoute.action(homeController.show));

        // Register the router on to the application
        app.use(router);

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            return next(createError(404));
        });

        // initialize error handler
        app.use(this.errorHandler);
    }
}