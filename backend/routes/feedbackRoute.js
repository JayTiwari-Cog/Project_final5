import { Router } from "express";
import { getBookingsForUser, createFeedback } from "../controllers/Feedback.js";
import verify from "../middleware/verify_Token.js";

const feedback = Router();

feedback.post('/book', verify, getBookingsForUser);
feedback.post('/feedback', verify, createFeedback);

export default feedback;