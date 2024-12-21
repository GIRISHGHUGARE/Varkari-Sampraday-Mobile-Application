import { loginController, registerController, requireSignIn, updateUserController, googleAuthController } from '../controllers/user.controllers.js';
import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleAuthController);
router.post("/register", registerController);
router.post("/login", loginController);

router.put("/update-user", requireSignIn, updateUserController)
export default router;