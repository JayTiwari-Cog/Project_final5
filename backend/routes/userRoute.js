import { Router } from "express";
import { loginUser, registerUser, verify } from "../controllers/userController.js";
 
import passport from "../config/passport_Config.js"
import jwt from "jsonwebtoken";
// import registrationSchema from "../validators/registrationValidator.js";
import loginSchema from "../validators/loginValidator.js";
import { getBookings } from "../controllers/GuestBooking.js";
// import validateRegisteration from "../middleware/Validators.js";
// import {createBooking, createGuest, getBookings } from "../controllers/GuestBooking.js";
// import { getAllHotels, getHotelByLocation } from "../controllers/HotelController.js";
// import { getBookingsForUser } from "../controllers/Feedback.js";
const router = Router();


// spread the schema arrays to register each validator function as middleware
router.post("/login", ...loginSchema, loginUser);
router.post("/register",  registerUser);
router.get('/verify', verify);

// router.post('/guest',createGuest);
// router.post('/test1',createBooking);
// router.get('/bookings',getBookings);
 

// router.get('/:city', getHotelByLocation)
// router.get('/hotel',getAllHotels);
// router.get('/book/:userId', getBookingsForUser);

export default router;
