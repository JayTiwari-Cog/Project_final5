import { checkSchema } from 'express-validator';    

const updateBookingStatusValidator = checkSchema({
  bookingId: {
    in: ['params'],
    notEmpty: { errorMessage: 'Booking ID is required' },
    isMongoId: { errorMessage: 'Invalid booking ID format' }
  },
  status: {
    in: ['body'],
    notEmpty: { errorMessage: 'Status is required' },
    isIn: {
      options: [['pending', 'confirmed', 'cancelled', 'completed', 'rejected']],
      errorMessage: 'Status must be one of: pending, confirmed, cancelled, completed, rejected'
    }
  }
});

export default updateBookingStatusValidator;