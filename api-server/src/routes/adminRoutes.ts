import express from "express";
import { UserRole } from "@prisma/client";

import { UserController } from "../controllers/userController";
import { requireAuth } from "../middleware/authentication";
import { requireRole } from "../middleware/authorization";
import { AdminController } from "../controllers/adminController";

const router = express.Router();

router.get("/users", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    AdminController.userList(req, res);
});

router.post("/users", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    UserController.createUserWithRole(req, res);
});

router.post("/trips", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    AdminController.tripList(req, res);
});

router.get("/info", requireAuth, requireRole(UserRole.Admin), (req, res) => {
    AdminController.adminPanelInfo(req, res);
});

export default router;