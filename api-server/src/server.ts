import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { loggerMiddleware } from './middleware/logging';
import userRoutes from './routes/userRoutes';
import tripRoutes from './routes/tripRoutes';

async function main() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    app.use(cors());
    app.use(express.json());
    app.use(loggerMiddleware());

    app.use('/users', userRoutes);
    app.use('/trips', tripRoutes);

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

main();