import { Request, Response } from "express";
import { UserService } from "../services/userService";

export namespace UserController {
    export const createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, phoneNumber} = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const user = await UserService.createUser({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            companyId: null,
        });

        res.status(201).json(user);
        return;
    }

    export const createUserWithRole = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, role } = req.body;

        if (!firstName || !lastName || !email || !password || !role) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const user = await UserService.createUserWithRole({
            firstName,
            lastName,
            email,
            password,
            role,
            companyId: null,
            phoneNumber: null,
        });

        if (!user) {
            res.status(500).json({ error: "Server error" });
            return;
        }

        res.status(201).json(user);
        return;
    }

    export const login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let userAndToken: any = null;
        try {
            userAndToken = await UserService.login({ email, password });
        } catch (err: any) {
            res.status(401).json({ error: err.message });
            return;
        }

        if (!userAndToken) {
            res.status(500).json({ error: "Server error" });
            return;
        }

        res.status(200).json({ message: "Login successful", ...userAndToken });
        return;
    }
}