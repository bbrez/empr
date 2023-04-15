import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.post("/users", (req, res) => {
    UserController.createUser(req, res);
});

router.post("login", (req, res) => {
    UserController.login(req, res);
});

export default router;