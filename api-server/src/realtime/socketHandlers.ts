import { PrismaClient, Trip, User } from "@prisma/client";
import { Socket } from "socket.io";
import { verifyToken } from "../middleware/authentication";

const prisma = new PrismaClient();

export const socketHandlers = async (socket: Socket) => {
    console.log('🔌  New connection', socket.id);

    if (!socket.handshake.auth.token) {
        console.error('❌  No token provided');
        socket.disconnect();
        return;
    }

    const token = socket.handshake.auth.token;
    let user = verifyToken(token);
    if (!user) {
        console.error('❌  User not found');
        socket.disconnect();
        return;
    }

    let trip: Trip | null = null;
    socket.on('joinRoom', async (data: any) => {
        console.log('🚪  joinRoom', data);
        const { tripId } = data;

        console.log('🔑  tripId', tripId)
        trip = await prisma.trip.findUnique({
            where: { id: parseInt(tripId) },
        });

        if (!trip) {
            console.error('❌️  Trip not found');
            socket.disconnect();
            return;
        }

        if (!trip.isActivated) {
            console.error('❌  🕒  Trip is not activated');
            socket.emit('tripNotActivated');
            socket.disconnect();
            return;
        }

        console.log(`👋  User ${user.firstName} joined trip ${trip.name}`)
        socket.join(tripId as string);
        return;
    });

    socket.on('updateLocation', async (data: any) => {
        console.log('🌐  updateLocation', data);
        const { location } = data;

        console.log('🔑  location', location);

        user = await prisma.user.update({
            where: { id: user.id },
            data: { currentLocation: JSON.stringify(location) },
        });

        socket.to(trip!.id.toString()).emit('userLocationUpdated', { userId: user.id, location: user.currentLocation });
        console.log(`🚶  User ${user.firstName} updated location to ${user.currentLocation}`);

        return;
    });

    socket.on('disconnect', () => {
        console.log(`💔 User ${user?.firstName} disconnected from trip ${trip?.name}`)
    });

    socket.on('error', (err: any) => {
        console.log(`❌ 💔 User ${user?.firstName} disconnected from trip ${trip?.name} with error ${err}`)
    });
}