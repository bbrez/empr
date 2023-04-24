import express from "express";
import { UserRole } from "@prisma/client";

import { UserController } from "../controllers/userController";
import { requireAuth } from "../middleware/authentication";
import { requireRole } from "../middleware/authorization";
import { AdminController } from "../controllers/adminController";

const router = express.Router();

router.get("/users", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    //not implemented
    return res.status(501).json({ error: "Not implemented" });
});

router.post("/users", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    UserController.createUserWithRole(req, res);
});

router.get("/info", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    AdminController.adminPanelInfo(req, res);
});

export default router;