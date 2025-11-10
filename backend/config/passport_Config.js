 
import passport from 'passport';
 
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
 
import dotenv from 'dotenv';
import User from '../models/User.js';
import UserCreds from '../models/UserCreds.js';
 
dotenv.config();

const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        console.log('Passport JWT payload:', jwt_payload);
        
        // Token was signed with { userId: ... } in login controller
        const user = await UserCreds.findById(jwt_payload.userId);
        if (user) {
            console.log('Passport: User found:', user.name);
            return done(null, user);
        }
        
        return done(null, false);
    } catch (err) {
        console.error('Passport JWT error:', err);
        return done(err, false);
    }
}));

export default passport;