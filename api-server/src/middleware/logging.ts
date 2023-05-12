import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

export const loggerMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    logger.info(`⬅️  Request: ${req.method} ${req.path}`);
    if (req.body != null && Object.keys(req.body).length != 0) logger.info("⬆️  Body: ", req.body);
    if (req.query != null && Object.keys(req.query).length != 0) logger.info("⬆️  Query: ", req.query);
    if (req.params != null && Object.keys(req.params).length != 0) logger.info("⬆️  Params: ", req.params);

    next();

    logger.info(`➡️  Response: ${req.method} ${req.path} ${res.statusCode}`)
}