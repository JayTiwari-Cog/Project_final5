import { checkSchema } from 'express-validator';
 
const loginSchema = checkSchema({
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Please enter a valid email address'
    },
    normalizeEmail: true
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    }
  }
});
 
export default loginSchema;
 
 