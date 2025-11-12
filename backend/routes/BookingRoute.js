import { Router } from "express";
import { createBookingByManager, getBookings, updateBookingStatus } from "../controllers/GuestBooking.js";
 
import bookingValidator from "../validators/bookingValidator.js";
import passport from "passport";
import updateBookingStatusValidator from "../validators/updateBookingStatusValidator.js";
import checkBlacklist from "../middleware/blacklisting_token.js";
import verifyTokenWithRoles from "../middleware/verifyWithRole.js";

const booking = Router();

booking.get('/bookings',passport.authenticate('jwt', { session: false }),verifyTokenWithRoles(['manager']),getBookings);

booking.put('/bookings/:bookingId',passport.authenticate('jwt', { session: false }),verifyTokenWithRoles(['manager']),updateBookingStatusValidator,updateBookingStatus);

booking.post('/booking',passport.authenticate('jwt', { session: false }),verifyTokenWithRoles(['manager']),bookingValidator,createBookingByManager)
export default booking;


