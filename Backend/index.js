import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';

import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';

import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

// Session store setup
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// Allowed origins for CORS (add your EC2 public IP or domain here)
const allowedOrigins = [
    'http://localhost:5173',      // local dev
    'http://localhost',           // docker-compose frontend
    'http://127.0.0.1',           // fallback
    'http://3.111.53.41',  // replace with actual IP or domain
];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Other middleware
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// Routes
app.use(UserRoute);
app.use(AuthRoute);

// Start server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running on port ${process.env.APP_PORT}`);
});
