import express from 'express';
import { registerController } from '../controllers/user.controllers.js';

const router = express.Router();

router.post("/register", registerController);

export default router;