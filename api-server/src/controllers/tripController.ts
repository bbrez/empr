import { Request, Response } from 'express';
import { TripService } from '../services/tripService';

export namespace TripController {
    export const createTrip = async (req: Request, res: Response) => {
        const { name, place, startDate, endDate } = req.body;

        if (!name || !place || !startDate || !endDate) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.createTrip({
                name,
                place,
                startDate,
                endDate,
            });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            res.status(400).json({ error: "Could not create trip" });
            return;
        }

        res.status(201).json(trip);
        return;
    }

    export const tripById = async (req: Request, res: Response) => {
        const { trip_id } = req.params;

        if (!trip_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.tripById(parseInt(trip_id));
        } catch (err: any) {
            console.error("❌ Could not get trip by id: ", err.message);
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            console.error("❌ Could not get trip by id");
            res.status(400).json({ error: "Could not get trip by id" });
            return;
        }

        res.status(200).json(trip);
        return;
    }

    export const activateTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;

        if (!trip_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.activateTrip(parseInt(trip_id));
        } catch (err: any) {
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            res.status(400).json({ error: "Could not activate trip" });
            return;
        }

        res.status(200).json(trip);
        return;
    }

    export const addUserToTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;
        const { user_id } = req.body;

        if (!trip_id || !user_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let result: any;
        try {
            result = await TripService.addUserToTrip(parseInt(trip_id), parseInt(user_id));
        } catch (err: any) {
            res.status(400).json({ error: err.message });
            return;
        }

        if (!result) {
            res.status(400).json({ error: "Could not add user to trip" });
            return;
        }

        res.status(200);
        return;
    }

    export const addUsersToTrip = async (req: Request, res: Response) => {
        const { trip_id } = req.params;
        const { user_ids } = req.body;

        if (!trip_id || !user_ids) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        let trip: any;
        try {
            trip = await TripService.addUsersToTrip(parseInt(trip_id), user_ids);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
            return;
        }

        if (!trip) {
            res.status(400).json({ error: "Could not add users to trip" });
            return;
        }

        res.status(200);
        return;
    }
}