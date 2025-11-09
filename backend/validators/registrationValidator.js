import { checkSchema } from 'express-validator';
 
const registrationSchema = checkSchema({
 
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name is required'
    },
    isLength: {
      options: { min: 3 , max: 20 },
      errorMessage: 'Name must be at least 3 characters long'
    },
    matches: {
      options: /^[A-Za-z\s]+$/,
      errorMessage: 'Name should contain only letters and spaces'
    }
  },
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
  phoneNumber: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Phone number is required'
    },
    isLength: {
      options: { min: 10, max: 11 },
      errorMessage: 'Phone number must be between 7 and 15 digits'
    },
    matches: {
      options: [/^[0-9]+$/],
      errorMessage: 'Phone number must contain only digits'
    }
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    },
    matches: {
      options: /^(?=.*[A-Za-z])(?=.*\d)/,
      errorMessage: 'Password must contain both letters and numbers'
    }
  },
  confirmPassword: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Please confirm your password'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }
    }
  },
  agreeTerms: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'Terms acceptance must be a boolean value'
    },
    custom: {
      options: value => {
        if (!value) {
          throw new Error('Please accept the Terms and Conditions to continue');
        }
        return true;
      }
    }
  }
});
 
export default registrationSchema;
 