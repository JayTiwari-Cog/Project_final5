import { Router } from "express";
import { loginUser, logoutUser, registerUser, verify } from "../controllers/userController.js";
import verifyToken from "../middleware/verify_Token.js";
 
import passport from "../config/passport_Config.js"
import jwt from "jsonwebtoken";
import loginSchema from "../validators/loginValidator.js";
import { getBookings } from "../controllers/GuestBooking.js";
const router = Router();



router.post("/login", ...loginSchema, loginUser);
router.post("/register",  registerUser);

router.post('/logout', verifyToken, logoutUser);

export default router;
