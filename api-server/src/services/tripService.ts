import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateTripPayload = Omit<Prisma.TripGetPayload<{}>, 'id' | 'isActivated' | 'createdAt' | 'updatedAt'>;

export namespace TripService {
    export const createTrip = async (trip: CreateTripPayload) => {
        const createdTrip = await prisma.trip.create({
            data: trip,
        });

        return createdTrip;
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

    export const addUserToTrip = async (tripId: number, userId: number) => {
        try {
            await prisma.usersOnTrips.create({
                data: {
                    user: {
                        connect: {
                            id: userId,
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
            console.error("❌ Could not add user to trip: ", err.message);
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