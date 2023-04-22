import { PrismaClient, Trip, User } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

const socketHandlers = async (socket: Socket) => {
    console.log('Socket connected');

    let user: User | null = null;
    let trip: Trip | null = null;
    socket.on('joinRoom', async (data: any) => {
        console.log('🚪  joinRoom', data);
        const { userId, tripId } = data;

        user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            console.error('❌  User not found');
            socket.disconnect();
            return;
        }

        trip = await prisma.trip.findUnique({
            where: { id: tripId },
        });

        if (!trip) {
            console.error('❌️  Trip not found');
            socket.disconnect();
            return;
        }

        if (!trip.isActivated) {
            console.error('❌  🕒  Trip is not activated');
            socket.disconnect();
            return;
        }

        console.log(`👋  User ${user.firstName} joined trip ${trip.name}`)
        socket.join(tripId as string);
        return;
    });

    socket.on('updateLocation', async (data: any) => {
        console.log('🌐  updateLocation', data);
        const { userId, location } = data;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { currentLocation: location },
        });

        socket.to(trip!.id.toString()).emit('userLocationUpdated', { userId: user.id, location: user.currentLocation });
        console.log(`🚶  User ${user.firstName} updated location to ${user.currentLocation}`);

        return;
    });

    socket.on('disconnect', () => {
        console.log(`💔 User ${user?.firstName} disconnected from trip ${trip?.name}`)
    });
}