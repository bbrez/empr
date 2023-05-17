import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { loggerMiddleware } from './middleware/logging';

import userRoutes from './routes/userRoutes';
import tripRoutes from './routes/tripRoutes';
import adminRoutes from './routes/adminRoutes';

import { socketHandlers } from './realtime/socketHandlers';
import logger from './util/logger';

async function main() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', socketHandlers)

    app.use(cors());
    app.use(loggerMiddleware());

    app.use(express.json());

    app.use('/users', userRoutes);
    app.use('/trips', tripRoutes);
    app.use('/admin', adminRoutes);

    server.listen(3000, () => {
        logger.info('Server running on port 3000');
    });
}

main();