import express from 'express';
import { loginController, registerController, updateUserController } from '../controllers/user.controllers.js';

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.put("/update-user", updateUserController)
export default router;