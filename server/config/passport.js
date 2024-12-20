import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';  // Adjust this import based on your file structure
import JWT from 'jsonwebtoken';

// Setup Passport Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user doesn't exist, create a new user in the database
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'user',
                password: null,  // No password needed for Google login
            });
            await user.save();
        }

        // Create a JWT token for the logged-in user
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return user and token
        return done(null, { user, token });
    } catch (error) {
        return done(error, false);
    }
}));

// Serialize user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user for sessions
passport.deserializeUser((user, done) => {
    done(null, user);
});
