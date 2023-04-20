import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    UserController.createUser(req, res);
});

router.post("/login", (req: Request, res: Response) => {
    UserController.login(req, res);
});

export default router;