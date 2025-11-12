import { Router } from "express";
import { getBookingsForUser, createFeedback } from "../controllers/Feedback.js";
 
import passport from "passport";
import checkBlacklist from "../middleware/blacklisting_token.js";
import verifyTokenWithRoles from "../middleware/verifyWithRole.js";

const feedback = Router();

feedback.post('/book', passport.authenticate('jwt', { session: false }), verifyTokenWithRoles(['user']), getBookingsForUser);
feedback.post('/feedback', passport.authenticate('jwt', { session: false }),verifyTokenWithRoles(['user']), createFeedback);

export default feedback;