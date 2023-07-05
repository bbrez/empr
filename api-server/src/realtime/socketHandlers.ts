import { PrismaClient, Trip, User } from "@prisma/client";
import { Socket } from "socket.io";
import { verifyToken } from "../middleware/authentication";
import { socketLogger } from "../util/logger";

const prisma = new PrismaClient();

export const socketHandlers = async (socket: Socket) => {
    socketLogger.info(`🔌  New connection ${socket.id}`);

    if (!socket.handshake.auth.token) {
        socketLogger.error('❌  No token provided');
        socket.disconnect();
        return;
    }

    const token = socket.handshake.auth.token;
    let user = verifyToken(token);
    if (!user) {
        socketLogger.error('❌  Invalid token');
        socket.disconnect();
        return;
    }

    let trip: Trip | null = null;
    socket.on('joinRoom', async (data: any) => {
        socketLogger.info(`🚪  joinRoom ${data}`);
        const { tripId } = data;

        socketLogger.info(`🔑  tripId ${tripId}`);
        trip = await prisma.trip.findUnique({
            where: { id: parseInt(tripId) },
        });

        if (!trip) {
            socketLogger.error('❌️  Trip not found');
            socket.disconnect();
            return;
        }

        if (!trip.isActivated) {
            socketLogger.error('❌  🕒  Trip is not activated');
            socket.emit('tripNotActivated');
            socket.disconnect();
            return;
        }

        socketLogger.info(`👋  User ${user.firstName} joined trip ${trip.name}`)
        socket.join(tripId as string);

        socket.emit('newMarker', { name: 'meetingPoint', location: trip.meetingPoint });
        socket.emit('newMarker', { name: 'tripArea', location: trip.areaCenter, data: trip.areaRadius });
        return;
    });

    socket.on('updateLocation', async (data: any) => {
        socketLogger.info(`🌐  updateLocation ${data}`);
        const { location } = data;

        socketLogger.info(`🔑  location ${location}`)

        user = await prisma.user.update({
            where: { id: user.id },
            data: { currentLocation: JSON.stringify(location) },
        });

        socket.to(trip!.id.toString()).emit('userLocationUpdated', { userId: user.id, location: user.currentLocation });
        socketLogger.info(`🚶  User ${user.firstName} updated location to ${user.currentLocation}`);

        return;
    });

    socket.on('disconnect', () => {
        socketLogger.info(`💔 User ${user?.firstName} disconnected from trip ${trip?.name}`)
    });

    socket.on('error', (err: any) => {
        socketLogger.error(`❌ 💔 User ${user?.firstName} disconnected from trip ${trip?.name} with error ${err}`)
    });
}