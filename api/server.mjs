import express from 'express';
import cors from "cors";
import helmet from "helmet";
import sessions from 'express-session';
import connectKnexSession from 'connect-session-knex';

import UserRoutes from '../users/user-router.mjs';
import AuthRoutes from '../auth/auth-router.mjs';
import knex from '../database/db-config.js';

const server = express();

const KnexSessionStore = connectKnexSession(sessions)

const sessionConfig = {
  // session storage options
  name: "dracarys", // default would be sid
  secret: process.env.SESSION_SECRET || "super super secret", // used for encryption (must be an environment variable)
  saveUninitialized: true, // has implications with GDPR laws
  resave: false,

  store: new KnexSessionStore({
    knex, // imported from dbConfig.js
    createtable: true,

    // optional
    clearInterval: 1000 * 60 * 10, // defaults to 6000
    sidfieldname: "sid",
    tablename: "sessions",
  }),
}

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(sessions(sessionConfig));

server.use('/api/auth', AuthRoutes)
server.use('/api/users', UserRoutes)

server.get('/', (req, res) => {
  res.send("<h2>Web Auth</h2>")
});

export default server;