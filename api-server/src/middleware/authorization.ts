import { Request, Response, NextFunction } from "express";
import { PrismaClient, UserRole } from "@prisma/client";
import { verifyToken } from "./authentication";
import logger from "../util/logger";

const prisma = new PrismaClient();

const roleToNumber = (role: UserRole) => {
    switch (role) {
        case UserRole.Admin:
            return 4;
        case UserRole.Manager:
            return 3;
        case UserRole.Guide:
            return 2;
        case UserRole.Tourist:
            return 1;
        default:
            return 0;
    }
}

/**
 * Middleware que verifica se o usuário é autorizado a acessar a rota 
 * Deve ser usado após o middleware de autenticação (requireAuth)
 * @param minRole nível de acesso mínimo necessário para acessar a rota
 * @returns 
 */
export const requireRole = (minRole: UserRole) => (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.isAuthenticated || !res.locals.user) {
        logger.error("❌ Authorization failed: User is not authenticated");
        return res.status(401).json({ error: "Authorization failed: User is not authenticated" });
    }

    const userRole = res.locals.user?.role;
    if (!userRole) {
        logger.error("❌ Authorization failed: User role not found");
        return res.status(401).json({ error: "Authorization failed: User role not found" });
    }

    if (roleToNumber(userRole) < roleToNumber(minRole)) {
        logger.error("❌ Authorization failed: User is not authorized");
        return res.status(401).json({ error: "Authorization failed: User is not authorized" });
    }

    logger.info("✅ Authorization successful");
    logger.info("⬆️  Min role: ", minRole);
    logger.info("⬆️  User role: ", userRole);

    next();
    return;
}