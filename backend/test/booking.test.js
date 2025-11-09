import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import GuestSchema from '../models/GuestSchema.js';
import Hotel from '../models/Hotel.js';
import Booking from '../models/Booking.js';
 
describe('Booking Controller API', () => {
  const validBookingData = {
    userId: '507f1f77bcf86cd799439011',
    hotelName: 'Test Hotel',
    guests: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      guestDetails: {
        numberOfPeople: 2,
        numberOfRooms: 1
      }
    },
    startDate: '2025-12-01T00:00:00.000Z',
    endDate: '2025-12-05T00:00:00.000Z'
  };
 
  let originalGuestCreate, originalHotelFindOne, originalBookingCreate;
 
  before(() => {
    // Mock database operations
    originalGuestCreate = GuestSchema.create;
    originalHotelFindOne = Hotel.findOne;
    originalBookingCreate = Booking.create;
 
    GuestSchema.create = async () => ({ _id: 'mock-guest-id' });
    Hotel.findOne = async () => ({ _id: 'mock-hotel-id', pricePerNight: 2000 });
    Booking.create = async (data) => ({ _id: 'mock-booking-id', ...data });
    GuestSchema.findOne = async () => ({ _id: 'mock-guest-id' });
  });
 
  after(() => {
    GuestSchema.create = originalGuestCreate;
    Hotel.findOne = originalHotelFindOne;
    Booking.create = originalBookingCreate;
  });
 
  describe('POST /api/booking - Validation Tests', () => {
    it('should fail when user ID is missing', async () => {
      const invalidData = { ...validBookingData, userId: undefined };
      const response = await request(app).post('/api/booking').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('User ID is required');
    });
 
    it('should fail when hotel name is missing', async () => {
      const invalidData = { ...validBookingData, hotelName: undefined };
      const response = await request(app).post('/api/booking').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Hotel name is required');
    });
 
    it('should fail when guest email is invalid', async () => {
      const invalidData = {
        ...validBookingData,
        guests: { ...validBookingData.guests, email: 'invalid-email' }
      };
      const response = await request(app).post('/api/booking').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Please enter a valid email');
    });
 
    it('should fail when phone number is invalid', async () => {
      const invalidData = {
        ...validBookingData,
        guests: { ...validBookingData.guests, phone: '123' }
      };
      const response = await request(app).post('/api/booking').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Phone number must be 10 digits');
    });
  });
 
  describe('POST /api/booking - Success Case', () => {
    it('should successfully create booking with valid data', async () => {
      const response = await request(app).post('/api/booking').send(validBookingData);
     
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Booking created successfully by manager');
    });
  });
});
 