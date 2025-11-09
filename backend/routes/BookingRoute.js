import { Router } from "express";
import { createBookingByManager, getBookings, updateBookingStatus } from "../controllers/GuestBooking.js";

const booking = Router();

booking.get('/bookings',getBookings);

booking.put('/bookings/:bookingId',updateBookingStatus);

booking.post('/booking',createBookingByManager)

export default booking;


