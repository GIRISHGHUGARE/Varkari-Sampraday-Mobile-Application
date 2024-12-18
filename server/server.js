import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.route.js';
import connectDB from './config/db.js';


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", (req, res) => {
    res.status(200).send({
        "success": true,
        "message": "Server is running!"
    })
})
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`.bgGreen.white)
})