import express from 'express';
import cors from "cors";
import helmet from "helmet";

import UserRoutes from '../users/user-router.mjs';
import AuthRoutes from '../auth/auth-router.mjs';

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', AuthRoutes)
server.use('/api/users', UserRoutes)

server.get('/', (req, res) => {
  res.send("<h2>Web Auth</h2>")
});

export default server;