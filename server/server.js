import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.route.js';
import connectDB from './config/db.js';
import passport from 'passport';
import session from 'express-session';

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for the mobile application domain
app.use(cors({ origin: "https://varkari-sampraday-mobile-application.onrender.com", credentials: true }));

// Middleware setup
app.use(express.json());
app.use(morgan('dev'));

// Session and Passport initialization
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Ensure you have a secure session secret
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/auth", userRoutes);  // Authentication routes (login, register, etc.)
app.use("/api/v1/post", postRoutes);  // Post routes

app.get("/", (req, res) => {
    res.status(200).send({
        "success": true,
        "message": "Server is running!"
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`.bgGreen.white);
});
