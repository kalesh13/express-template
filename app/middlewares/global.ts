import { RequestHandler } from "express";
import maintenanceMiddleware from "./global/maintenance";
import trimStrings from "./global/trimStrings";
import nullEmptyStrings from "./global/nullEmptyStrings";
import methodOverride from "./global/methodOverride";

const globalMiddlewares: RequestHandler[] = [
    methodOverride,
    maintenanceMiddleware,
    trimStrings,
    nullEmptyStrings
];

export default globalMiddlewares;