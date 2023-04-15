import { env } from "process";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { PrismaClient, User } from "@prisma/client";
import { comparePassword } from "./crypto";

const jwtSecret = env?.JWT_SECRET || "secret";
const tokenExpiration = "24h";

const prisma = new PrismaClient();

export function createToken(user: any) {
    return jwt.sign({ user }, jwtSecret, { expiresIn: tokenExpiration })
}

export function verifyToken(token: string) {
    return jwt.verify(token, jwtSecret) as User;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Authentication failed: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
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
        const decoded = jwt.verify(token, jwtSecret);
        req.body.user = decoded;
        next();
    } catch (err) {
        req.body.user = null;
        next();
    }
}

export async function loginHandler(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ error: "Authentication failed: Wrong password" });
    }

    const token = createToken(user);

    res.json({ token });
}