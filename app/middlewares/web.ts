import { RequestHandler } from "express";
import settingsForWeb from "./routes/settingsForWeb";
import startSession from "./routes/startSession";
import csurf from "csurf";
import csrfToLocals from "./routes/csrfToViews";

const webMiddlewares: RequestHandler[] = [
    settingsForWeb,
    startSession,
    csurf({ cookie: true }),
    csrfToLocals
];

export default webMiddlewares;
