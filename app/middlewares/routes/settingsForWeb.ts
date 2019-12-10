import { RequestHandler } from "express";

// Make the web app settings available for all 
// views. Settings like social links, meta details are all
// needed when page loads.
//
// Or else the app should be a single page app (SPA)
const settingsForWeb: RequestHandler = function (req, res, next) {
    

    return next();
}

export default settingsForWeb;