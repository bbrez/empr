import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    console.log(`⬅️  ${req.method} ${req.path}`);
    if (req.body != null && Object.keys(req.body).length != 0) console.log("⬆️  Body:", req.body);
    if (req.query != null && Object.keys(req.query).length != 0) console.log("⬆️  Query:", req.query);
    if (req.params != null && Object.keys(req.params).length != 0) console.log("⬆️  Params:", req.params);

    next();

    console.log(`➡️  ${res.statusCode}`);
}