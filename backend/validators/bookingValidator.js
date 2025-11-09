import { checkSchema } from 'express-validator';
 
const bookingValidator = checkSchema({
  userId: {
    in: ['body'],
    notEmpty: { errorMessage: 'User ID is required' }
  },
  hotelName: {
    in: ['body'],
    notEmpty: { errorMessage: 'Hotel name is required' },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Hotel name must be at least 2 characters'
    }
  },
  'guests.name': {
    in: ['body'],
    notEmpty: { errorMessage: 'Guest name is required' }
  },
  'guests.email': {
    in: ['body'],
    notEmpty: { errorMessage: 'Guest email is required' },
    isEmail: { errorMessage: 'Please enter a valid email' }
  },
  'guests.phone': {
    in: ['body'],
    notEmpty: { errorMessage: 'Guest phone is required' },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: 'Phone number must be 10 digits'
    }
  },
  startDate: {
    in: ['body'],
    notEmpty: { errorMessage: 'Start date is required' },
    isISO8601: { errorMessage: 'Please enter a valid start date' }
  },
  endDate: {
    in: ['body'],
    notEmpty: { errorMessage: 'End date is required' },
    isISO8601: { errorMessage: 'Please enter a valid end date' }
  }
});
 
export default bookingValidator;
 