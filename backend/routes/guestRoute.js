import { Router } from "express";
import { createGuest, createBooking } from "../controllers/GuestBooking.js";
import validateGuest from "../middleware/GuestValidators.js";
 
import bookingValidator from "../validators/bookingValidator.js";
import passport from "passport";
import checkBlacklist from "../middleware/blacklisting_token.js";
import verifyTokenWithRoles from "../middleware/verifyWithRole.js";


const guest = Router();

guest.post('/guest',passport.authenticate('jwt', { session: false }), validateGuest,verifyTokenWithRoles(['user']), createGuest);
guest.post('/createBook',passport.authenticate('jwt', { session: false }), verifyTokenWithRoles(['user']), bookingValidator, createBooking);

export default guest;