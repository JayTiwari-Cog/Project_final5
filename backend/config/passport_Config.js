 
import passport from 'passport';
 
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
 
import dotenv from 'dotenv';
import User from '../models/User.js';
 
dotenv.config();

const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        // Token was signed with { userId: ... } in login controller
        const user = await User.findById(jwt_payload.userId);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;