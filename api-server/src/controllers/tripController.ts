import { Request, Response } from 'express';
import { TripService } from '../services/tripService';
import { z } from 'zod';
import logger from '../util/logger';

export namespace TripController {
    export const createTrip = async (req: Request, res: Response) => {
        const validator = z.object({
            name: z.string(),
            place: z.string(),
            startDate: z.date(),
            endDate: z.date(),
            companyId: z.number(),
        });

        const validated = validator.safeParse(req.body);
        if (!validated.success) {
            logger.error("❌ Missing required fields");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const { name, place, startDate, endDate, companyId } = req.body;

        let trip: any;
        try {
            trip = await TripService.createTrip({
                name,
                place,
                startDate,
                endDate,
                companyId
            });
        } catch (err: any) {
            logger.error("❌ Could not create trip: ", err.message)
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            logger.error("❌ Could not create trip");
            res.status(500).json({ error: "Could not create trip" });
            return;
        }

        logger.info("✅ Trip created: ", trip);
        res.status(201).json(trip);
        return;
    }

    export const tripById = async (req: Request, res: Response) => {
        const validator = z.number();

        const validated = validator.safeParse(req.params.trip_id);
        if (!z.string().safeParse(req.params.trip_id).success) {
            logger.error("❌ Missing trip Id");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const { trip_id } = req.params;

        let trip: any;
        try {
            trip = await TripService.tripById(parseInt(trip_id));
        } catch (err: any) {
            logger.error("❌ Could not get trip by id: ", err.message);
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            logger.error("❌ Could not get trip by id");
            res.status(400).json({ error: "Could not get trip by id" });
            return;
        }

        res.status(200).json(trip);
        return;
    }

    export const setTripArea = async (req: Request, res: Response) => {
        const { trip_id } = req.params;
        const { area } = req.body;

        if (!trip_id) {
            logger.error("❌ Missing trip Id");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        if (!area.position.lat || !area.position.long || !area.radius) {
            logger.error("❌ Missing area fields");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.setTripArea(parseInt(trip_id), area);
        } catch (err: any) {
            logger.error("❌ Could not set trip area: ", err.message)
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            logger.error("❌ Could not set trip area");
            res.status(400).json({ error: "Could not set trip area" });
            return;
        }

        logger.info("✅ Trip area set");
        res.status(200).json(trip);
        return;
    }

    export const activateTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;

        if (!trip_id) {
            logger.error("❌ Missing trip Id");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.activateTrip(parseInt(trip_id));
        } catch (err: any) {
            logger.error("❌ Could not activate trip: ", err.message)
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            logger.error("❌ Could not activate trip")
            res.status(400).json({ error: "Could not activate trip" });
            return;
        }

        logger.info("✅ Trip activated");
        res.status(200).json(trip);
        return;
    }

    export const addUserToTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;
        const { user_id } = req.body;

        if (!trip_id || !user_id) {
            logger.error("❌ Missing required fields")
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let result: any;
        try {
            result = await TripService.addUserToTrip(parseInt(trip_id), parseInt(user_id));
        } catch (err: any) {
            logger.error("❌ Could not add user to trip: ", err.message)
            res.status(400).json({ error: err.message });
            return;
        }

        if (!result) {
            logger.error("❌ Could not add user to trip")
            res.status(400).json({ error: "Could not add user to trip" });
            return;
        }

        logger.info("✅ User added to trip");
        res.status(200);
        return;
    }

    export const addUsersToTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;
        const { user_ids } = req.body;

        if (!trip_id || !user_ids) {
            logger.error("❌ Missing required fields")
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.addUsersToTrip(parseInt(trip_id), user_ids);
        } catch (err: any) {
            logger.error("❌ Could not add users to trip: ", err.message)
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            logger.error("❌ Could not add users to trip")
            res.status(400).json({ error: "Could not add users to trip" });
            return;
        }

        logger.info("✅ Users added to trip");
        res.status(200);
        return;
    }
}