import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export namespace AdminService {
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