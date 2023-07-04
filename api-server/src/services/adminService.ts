import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export namespace AdminService {
    export const userList = async (page: number) => {
        const users = await prisma.user.findMany({
            skip: (page - 1) * 100,
            take: 100,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                company: true
            },
        });

        return users;
    }

    export const tripList = async (page: number) => {
        const trips = await prisma.trip.findMany({
            skip: (page - 1) * 100,
            take: 100,
            select: {
                id: true,
                name: true,
                areaCenter: true,
                areaRadius: true,
                isActivated: true,
                endDate: true,
                meetingPoint: true,
                meetingTime: true,
                startDate: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return trips;
    }

    export const adminPanelInfo = async () => {
        const userCount = await prisma.user.count();

        const tripCount = await prisma.trip.count();
        const activeTripCount = await prisma.trip.count({
            where: {
                isActivated: true,
            },
        });

        return {
            users: {
                userCount
            },

            trips: {
                tripCount,
                activeTripCount,
            }
        }
    }
}