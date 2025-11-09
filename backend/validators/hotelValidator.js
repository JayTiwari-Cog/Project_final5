import { checkSchema } from 'express-validator';
 
const hotelValidator = checkSchema({
  hotelName: {
    in: ['body'],
    notEmpty: { errorMessage: 'Hotel name is required' },
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: 'Hotel name must be between 2 and 100 characters'
    }
  },
  roomType: {
    in: ['body'],
    isArray: { errorMessage: 'Room type must be an array' },
    custom: {
      options: (value) => {
        if (!value || value.length === 0) {
          throw new Error('At least one room type is required');
        }
        return true;
      }
    }
  },
  amenities: {
    in: ['body'],
    isArray: { errorMessage: 'Amenities must be an array' },
    custom: {
      options: (value) => {
        if (!value || value.length === 0) {
          throw new Error('At least one amenity is required');
        }
        return true;
      }
    }
  },
  'address.city': {
    in: ['body'],
    notEmpty: { errorMessage: 'City is required' }
  },
  'address.postalCode': {
    in: ['body'],
    matches: {
      options: /^[0-9]{6}$/,
      errorMessage: 'Postal code must be 6 digits'
    }
  },
  pricePerNight: {
    in: ['body'],
    isNumeric: { errorMessage: 'Price must be a number' },
    custom: {
      options: (value) => {
        if (value <= 0) {
          throw new Error('Price must be greater than 0');
        }
        return true;
      }
    }
  }
});
 
export default hotelValidator;
 