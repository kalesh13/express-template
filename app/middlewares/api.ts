import { RequestHandler } from "express";
import throttleRequests from "./routes/throttleRequests";

const apiMiddlewares: RequestHandler[] = [
    throttleRequests
];

export default apiMiddlewares;