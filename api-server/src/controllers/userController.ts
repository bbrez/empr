import { Request, Response } from "express";
import { UserService } from "../services/userService";

export namespace UserController {
    export const createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;

        const user = await UserService.createUser({
            firstName,
            lastName,
            email,
            password,
        });

        res.status(201).json(user);
    }

    export const createUserWithRole = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, role } = req.body;

        const user = await UserService.createUserWithRole({
            firstName,
            lastName,
            email,
            password,
            role,
        });

        res.status(201).json(user);
    }

    export const login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        UserService.login({ email, password });
    }
}