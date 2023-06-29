import { Prisma, PrismaClient, User } from "@prisma/client";
import logger from "../util/logger";
import { Area, Meeting } from "../util/types";

const prisma = new PrismaClient();

type CreateTripPayload = Pick<Prisma.TripGetPayload<{}>, 'name' | 'place' | 'startDate' | 'endDate' | 'companyId'>;

export namespace TripService {
    export const createTrip = async (trip: CreateTripPayload) => {
        const createdTrip = await prisma.trip.create({
            data: trip,
        });

        return createdTrip;
    }

    export const userTrips = async (user: User) => {
        let trips: any[] = [];
        if (user.role == 'Admin' || user.role == 'Manager') {
            if (!user.companyId) throw new Error('User has no company');

            trips = await prisma.trip.findMany({
                where: {
                    companyId: user.companyId,
                },
            });

        } else {
            const today = new Date();

            trips = await prisma.trip.findMany({
                where: {
                    UsersOnTrips: {
                        some: {
                            userId: user.id,
                        }
                    },
                    startDate: {
                        gte: today,
                    }
                },
                orderBy: {
                    startDate: 'asc',
                },
            });
        }

        return trips;
    }

    export const tripById = async (id: number) => {
        const trip = await prisma.trip.findUnique({
            where: {
                id,
            },
            include: {
                UsersOnTrips: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                }
            }
        });

        return trip;
    }

    export const activateTrip = async (id: number, area: {center: {lat: number, lng: number}, radius: number}, meeting: {lat: number, lng: number}) => {
        const trip = await prisma.trip.update({
            where: {
                id,
            },
            data: {
                areaRadius: area.radius,
                areaCenter: JSON.stringify(area.center),
                meetingPoint: JSON.stringify(meeting),
                isActivated: true,
            },
        });

        return trip;
    }

    export const addUserToTrip = async (tripId: number, userEmail: string) => {
        try {
            await prisma.usersOnTrips.create({
                data: {
                    user: {
                        connect: {
                            email: userEmail,
                        }
                    },
                    trip: {
                        connect: {
                            id: tripId,
                        }
                    }
                },
            });
        } catch (err: any) {
            logger.error("❌ Could not add user to trip: ", err.message);
            return false;
        }

        return true;
    }

    export const addUsersToTrip = async (tripId: number, userIds: number[]) => {
        const relations = userIds.map(userId => ({
            user: { connect: { id: userId } }, userId: userId,
            trip: { connect: { id: tripId } }, tripId: tripId,
        }));

        await prisma.usersOnTrips.createMany({
            data: relations,
        });
    }
}