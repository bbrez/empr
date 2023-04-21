import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    console.log(`⬅️  ${req.method} ${req.path}`);
    if (Object.keys(req.body).length != 0) console.log("⬆️  Body:", req.body);
    // if (req.query) console.log(req.query);
    // if (req.params) console.log(req.params);
    // if (req.headers) console.log(req.headers);
    // if (req.cookies) console.log(req.cookies);
    next();
}