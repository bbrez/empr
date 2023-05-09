import { env } from "process";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { PrismaClient, User } from "@prisma/client";
import logger from "../util/logger";

const accessSecret = env?.JWT_SECRET || "secret";

const prisma = new PrismaClient();

export function createAccessToken(user: any) {
    return jwt.sign({ user }, accessSecret)
}

export function verifyToken(token: string) {
    return (<any>jwt.verify(token, accessSecret)).user as User;
}

/**
 * Middleware que verifica se o usuário está autenticado
 * Se o não for fornecido um token, retorna um erro 401
 * Se o token for inválido, retorna um erro 403
 * Se o token for válido, continua a requisição
 * @param req 
 * @param res 
 * @param next 
 * @returns
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.error("❌ Authentication failed: No token provided");
        return res.status(401).json({ error: "Authentication failed: No token provided" });
    }

    const token = authHeader.substring(7, authHeader.length);
    if (!token) {
        logger.error("❌ Authentication failed: No token provided");
        return res.status(401).json({ error: "Authentication failed: No token provided" });
    }

    try {
        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
        });

        if (user == null) {
            logger.error("❌ Authentication failed: Invalid Token");
            logger.error("User not found: ", decoded);
            return res.status(403).json({ error: "Authentication failed: Invalid Token" });
        }

        if (JSON.stringify(user) !== JSON.stringify(decoded)) {
            logger.error("❌ Authentication failed: Invalid Token");
            logger.error("🧑‍💻 User: ", user);
            logger.error("🧑‍💻 Decoded: ", decoded);
            return res.status(403).json({ error: "Authentication failed: Invalid Token" });
        }

        res.locals.isAuthenticated = true;
        res.locals.user = decoded;
        logger.info("✅ Authentication successful");
        logger.info("⬆️  User: ", decoded.email);
        next();
    } catch (err) {
        logger.error("❌ Authentication failed: Invalid Token");
        logger.error("❌ Error: ", err);
        return res.status(403).json({ error: "Authentication failed: Invalid Token" });
    }

    return;
}

/**
 * Middleware que verifica se o usuário está autenticado
 * Se o não for fornecido um token, o usuário é definido como null
 * Se o token for inválido, o usuário é definido como null 
 * Sempre continua a requisição
 * @deprecated provavelmente não será mais usado
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        req.body.user = null;
        next();
        return;
    }

    try {
        const decoded = jwt.verify(token, accessSecret);
        req.body.user = decoded;
        next();
    } catch (err) {
        req.body.user = null;
        next();
    }
}