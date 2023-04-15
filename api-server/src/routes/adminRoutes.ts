import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.post("/users", (req, res) => {
    UserController.createUserWithRole(req, res);
});

export default router;