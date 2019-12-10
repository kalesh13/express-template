import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import helpers from "./helper";
import globalMiddlewares from './app/middlewares/global';
import { RouteRegister } from './routes/router';

// Initializes a new Express app instance.
const app = express();

//==========================================
// Register view engine
//===========================================
app.set('views', path.resolve('resources', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//==========================================
// Add helper functions to res.locals
//===========================================

app.use(function (req, res, next) {
    res.locals = Object.assign(helpers, res.locals);
    return next();
});

//==========================================
// Register the static files folder.
//===========================================
app.use(express.static(path.resolve('public')));

//==========================================
// Register global Middlewares
//===========================================
app.use(globalMiddlewares);

//==========================================
// Routes - register app routes
//===========================================
new RouteRegister().register(app);

export default app;