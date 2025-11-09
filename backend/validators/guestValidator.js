import { checkSchema } from 'express-validator';
 
const guestValidator = checkSchema({
  fullName: {
    in: ['body'],
    exists: { errorMessage: 'Full name is required' },
    isString: { errorMessage: 'Full name must be a string' },
    notEmpty: { errorMessage: 'Full name cannot be empty' },
    trim: true
  },
  email: {
    in: ['body'],
    exists: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Email must be valid' },
    normalizeEmail: true
  },
  country: {
    in: ['body'],
    exists: { errorMessage: 'Country is required' },
    isString: { errorMessage: 'Country must be a string' },
    notEmpty: { errorMessage: 'Country cannot be empty' },
    trim: true
  },
  phone: {
    in: ['body'],
    exists: { errorMessage: 'Phone number is required' },
    isNumeric: { errorMessage: 'Phone number must be numeric' },
    isLength: {
      options: { min: 10, max: 15 },
      errorMessage: 'Phone number must be between 10 and 15 digits'
    }
  }
});
 
export default guestValidator;
 
 