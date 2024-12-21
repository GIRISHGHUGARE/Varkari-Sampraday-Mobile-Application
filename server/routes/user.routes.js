import { loginController, registerController, requireSignIn, updateUserController, googleAuthController } from '../controllers/user.controllers.js';
import express from 'express';
import passport from 'passport';
const router = express.Router();
import User from '../models/user.model.js'

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',  // Redirect to login page on failure
}), (req, res) => {
    // Successful authentication
    res.redirect('/Home');  // Redirect to a secure route after successful login
});
router.post("/register", registerController);
router.post("/login", loginController);
// Backend Route for Google Login
router.post('/google-login', async (req, res) => {
    const { id_token } = req.body;

    // Verify the id_token using Google's OAuth2.0 library
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Your Google Client ID
        });

        const payload = ticket.getPayload();
        const user = await User.findOne({ googleId: payload.sub });

        if (!user) {
            const newUser = new User({
                googleId: payload.sub,
                name: payload.name,
                email: payload.email,
                role: 'user',
            });
            await newUser.save();
            res.status(200).send({ message: 'User created successfully', user: newUser });
        } else {
            res.status(200).send({ message: 'User logged in successfully', user });
        }
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).send({ message: 'Google login failed', error: error.message });
    }
});

router.put("/update-user", requireSignIn, updateUserController)
export default router;