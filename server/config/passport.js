// auth/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';  // Adjust this import based on your file structure
import JWT from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://varkari-sampraday-mobile-application.onrender.com/api/v1/auth/google/callback',  // Adjust this for production
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'user',
                password: null  // No password needed for Google login
            });
            await user.save();
        }

        // Create a JWT token for the logged-in user
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return done(null, { user, token });
    } catch (error) {
        return done(error);
    }
}));

// Serialize user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});
