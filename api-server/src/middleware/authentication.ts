import { env } from "process";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { PrismaClient, User } from "@prisma/client";

const accessSecret = env?.ACCESS_JWT_SECRET || "secret";
const refreshSecret = env?.REFRESH_JWT_SECRET || "terces";

const prisma = new PrismaClient();

export function createAccessToken(user: any) {
    return jwt.sign({ user }, accessSecret, { expiresIn: '1h' })
}

export function createRefreshToken(user: any) {
    return jwt.sign({ user }, refreshSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
    return jwt.verify(token, accessSecret) as User;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Authentication failed: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, accessSecret);
        req.body.user = decoded;
        next()
    } catch (err) {
        return res.status(403).json({ error: "Authentication failed: Invalid Token" });
    }
}

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