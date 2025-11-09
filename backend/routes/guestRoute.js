import { Router } from "express";
import { createGuest, createBooking } from "../controllers/GuestBooking.js";
import validateGuest from "../middleware/GuestValidators.js";


const guest = Router();

guest.post('/guest', validateGuest, createGuest);
guest.post('/test1', createBooking);

export default guest;