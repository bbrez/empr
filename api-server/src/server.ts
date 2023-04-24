import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';

import { loggerMiddleware } from './middleware/logging';

import userRoutes from './routes/userRoutes';
import tripRoutes from './routes/tripRoutes';
import adminRoutes from './routes/adminRoutes';

import { socketHandlers } from './realtime/socketHandlers';

const spec = require('../openapi.json');

async function main() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
        },
    });

    io.on('connection', socketHandlers)

    app.use(cors());
    app.use(loggerMiddleware());

    // app.get('/docs', swaggerUi.serve, swaggerUi.setup(spec));
    // app.get('/swagger-ui-init.js', ...swaggerUi.serve);
    // app.get('/swagger-ui.css', ...swaggerUi.serve);
    // app.get('/swagger-ui-bundle.js', ...swaggerUi.serve);
    // app.get('/swagger-ui-standalone-preset.js', ...swaggerUi.serve);
    // app.get('/openapi.json', (req, res) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(spec);
    // });

    app.use(express.json());

    app.use('/users', userRoutes);
    app.use('/trips', tripRoutes);
    app.use('/admin', adminRoutes);

    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

main();