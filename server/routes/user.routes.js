import { loginController, registerController, requireSignIn, updateUserController, googleAuthController } from '../controllers/user.controllers.js';
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, send the token and user details to the client
        const { user, token } = req.user;  // Passport user data and JWT token
        res.status(200).send({
            message: 'User logged in successfully',
            user: user,
            token: token  // Send the JWT token to the client
        });
    });


// In user.routes.js, make sure you have this route for handling Google login
router.post("/google-login", passport.authenticate("google-id-token", { session: false }), async (req, res) => {
    try {
        const { user, token } = req.user;  // This will come from the Google login callback
        res.status(200).json({
            message: "Google login successful",
            user,
            token,
        });
    } catch (error) {
        console.error("Google login failed", error);
        res.status(500).json({ message: "Google login failed!" });
    }
});


router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update-user", requireSignIn, updateUserController);


export default router;