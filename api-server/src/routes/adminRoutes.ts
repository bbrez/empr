import express from "express";
import { UserRole } from "@prisma/client";

import { UserController } from "../controllers/userController";
import { requireAuth } from "../middleware/authentication";
import { requireRole } from "../middleware/authorization";

const router = express.Router();

router.post("/users", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    UserController.createUserWithRole(req, res);
});

export default router;