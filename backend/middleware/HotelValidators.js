import hotelValidator from "../validators/hotelValidator.js";
import { validationResult } from "express-validator";

const validateHotel = [
    ...hotelValidator,
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

export default validateHotel;