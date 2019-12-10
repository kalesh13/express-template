import { Express } from "express";

export default interface iRegistrar {
    register(app: Express): void;
}