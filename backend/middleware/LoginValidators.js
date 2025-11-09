import loginSchema from "../validators/loginValidator.js";
import { validationResult } from "express-validator";

const validateLogin = [
    ...loginSchema,
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

export default validateLogin;