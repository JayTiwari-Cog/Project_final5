import { Router } from "express";
import { loginUser, logout, registerUser } from "../controllers/userController.js";
 
 
import passport from "../config/passport_Config.js"
import jwt from "jsonwebtoken";
import loginSchema from "../validators/loginValidator.js";
import { getBookings } from "../controllers/GuestBooking.js";
import registrationSchema from "../validators/registrationValidator.js";
import validateRegisteration from "../middleware/Validators.js";
const router = Router();



router.post("/login",loginSchema, loginUser);
router.post("/register",validateRegisteration,  registerUser);

router.get('/logout', passport.authenticate('jwt', { session: false }), logout);

export default router;
