import express from 'express';
import cors from 'cors';

import { loggerMiddleware } from './middleware/logging';
import userRoutes from './routes/userRoutes';

async function main() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(loggerMiddleware());

    app.use('/users', userRoutes);

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

main();