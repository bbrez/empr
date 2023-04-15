import express from 'express';
import cors from 'cors';

import { loginHandler, optionalAuth } from './authentication';
import { createUser } from './users';

async function main() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use((req, _res, next) => {
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
        next();
    });

    app.post('/login', loginHandler);
    app.post('/users', optionalAuth, createUser);

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}

main();