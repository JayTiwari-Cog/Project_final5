import { Router } from "express";
import { getBookingsForUser, createFeedback } from "../controllers/Feedback.js";

const feedback = Router();

feedback.post('/book', getBookingsForUser);
feedback.post('/feedback', createFeedback);

export default feedback;