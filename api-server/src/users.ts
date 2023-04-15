import { Request, Response } from "express";
import { PrismaClient, UserRole } from "@prisma/client"
import { hashPassword } from "./crypto";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "missing-credentials" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ error: "invalid-email" });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({ error: "password-short" });
        return;
    }

    if (!/\d/.test(password)) {
        res.status(400).json({ error: "password-no-number" });
        return;
    }

    if (!/[A-Z]/.test(password)) {
        res.status(400).json({ error: "password-no-uppercase" });
        return;
    }

    if (!/[a-z]/.test(password)) {
        res.status(400).json({ error: "password-no-lowercase" });
        return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        res.status(400).json({ error: "password-no-special" });
        return;
    }


    let role: UserRole;
    if (req.body.user) {
        role = req.body.role;
    } else {
        role = UserRole.Tourist;
    }

    const hashedPassword = hashPassword(password);

    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userExists) {
        res.status(409).json({ error: "email-exists" });
        return;
    }

    const user = await prisma.user.create({
        data: {
            email,
            pwHash: await hashedPassword,
            role,
        },
    });

    res.status(201).json(user);
}