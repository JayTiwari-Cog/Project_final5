import { Router } from "express";
import { createGuest, createBooking } from "../controllers/GuestBooking.js";
import validateGuest from "../middleware/GuestValidators.js";
import verify from "../middleware/verify_Token.js";


const guest = Router();

guest.post('/guest', validateGuest, verify, createGuest);
guest.post('/createBooking', verify, createBooking);// here changed

export default guest;