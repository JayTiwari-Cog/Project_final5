import { Router } from "express";
import { createBookingByManager, getBookings, updateBookingStatus } from "../controllers/GuestBooking.js";
import verify from "../middleware/verify_Token.js";

const booking = Router();

booking.get('/bookings',verify,getBookings);

booking.put('/bookings/:bookingId',verify,updateBookingStatus);

booking.post('/booking',verify,createBookingByManager)

export default booking;


