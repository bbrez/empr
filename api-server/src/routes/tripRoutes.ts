import express, { Request, Response } from "express";
import { TripController } from "../controllers/tripController";
import { requireAuth } from "../middleware/authentication";
import { requireRole } from "../middleware/authorization";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", requireAuth, requireRole(UserRole.Manager), (req: Request, res: Response) => {
    TripController.createTrip(req, res);
});

router.get('/:trip_id', requireAuth, requireRole(UserRole.Tourist),
    (req: Request, res: Response) => {
        TripController.tripById(req, res);
    });

router.post('/:trip_id/area', requireAuth, requireRole(UserRole.Guide),
    (req: Request, res: Response) => {
        TripController.setTripArea(req, res);
    });

router.post('/:trip_id/activate', requireAuth, requireRole(UserRole.Guide),
    (req: Request, res: Response) => {
        TripController.activateTrip(req, res);
    });

router.post("/:trip_id/users", requireAuth, requireRole(UserRole.Manager),
    (req: Request, res: Response) => {
        TripController.addUserToTrip(req, res);
    });

router.post("/:trip_id/users/bulk", requireAuth, requireRole(UserRole.Manager),
    (req: Request, res: Response) => {
        TripController.addUsersToTrip(req, res);
    });

export default router;