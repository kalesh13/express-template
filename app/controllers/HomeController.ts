import { Request, Response, NextFunction } from "express";

export class HomeController {

    public show(req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: 'Express' });
    }
}