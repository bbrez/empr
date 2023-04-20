import { Request, Response, NextFunction } from "express";
import { PrismaClient, UserRole } from "@prisma/client";
import { verifyToken } from "./authentication";

const prisma = new PrismaClient();

const autorizeUser = (roles: Array<UserRole>) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user.role)) {
        return res.status(403).json({ error: "Authorization failed: Insufficient privileges" });
    }

    next();
}