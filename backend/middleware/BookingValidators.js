import bookingValidator from "../validators/bookingValidator.js";
import { validationResult } from "express-validator";

const validateBooking = [
    ...bookingValidator,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                message: errors.array()[0].msg
            });
        }
        next();
    }
];

export default validateBooking;