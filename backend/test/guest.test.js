import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import GuestSchema from '../models/GuestSchema.js';
 
describe('Guest Creation API', () => {
  // Test data
  const validGuestData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    country: 'United States',
    phone: '1234567890',
    guestDetails: {
      adults: 2,
      children: 1,
      rooms: 1
    }
  };
 
  // Store original methods to restore later
  let originalGuestCreate;
  let originalGuestFindOne;
 
  // Mock database operations before all tests
  before(() => {
    // Store original methods
    originalGuestCreate = GuestSchema.create;
    originalGuestFindOne = GuestSchema.findOne;
 
    // Mock GuestSchema.create to return a mock guest
    GuestSchema.create = async (guestData) => ({
      _id: 'mock-guest-id-12345',
      fullName: guestData.fullName,
      email: guestData.email,
      country: guestData.country,
      phone: guestData.phone,
      guestDetails: guestData.guestDetails,
      createdAt: new Date()
    });
 
    // Mock GuestSchema.findOne to return null (no existing guest)
    GuestSchema.findOne = async () => null;
  });
 
  // Restore original methods after all tests
  after(() => {
    GuestSchema.create = originalGuestCreate;
    GuestSchema.findOne = originalGuestFindOne;
  });
 
  describe('POST /api/guest - Full Name Validation', () => {
    it('should fail when fullName is missing', async () => {
      const invalidData = { ...validGuestData };
      delete invalidData.fullName;
 
      const response = await request(app)
        .post('/api/guest')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Full name is required');
    });
 
    it('should accept valid fullName', async () => {
      const validData = {
        ...validGuestData,
        fullName: 'Jane Smith'
      };
 
      const response = await request(app)
        .post('/api/guest')
        .send(validData);
 
      expect(response.status).to.equal(201);
    });
  });
 
  describe('POST /api/guest - Email Validation', () => {
    it('should fail when email format is invalid', async () => {
      const invalidData = {
        ...validGuestData,
        email: 'invalid-email'
      };
 
      const response = await request(app)
        .post('/api/guest')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Email must be valid');
    });
  });
 
  describe('POST /api/guest - Phone Number Validation', () => {
    it('should fail when phone number is too short', async () => {
      const invalidData = {
        ...validGuestData,
        phone: '123456789' // 9 digits, less than minimum 10
      };
 
      const response = await request(app)
        .post('/api/guest')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Phone number must be between 10 and 15 digits');
    });
 
    it('should accept valid 10-digit phone number', async () => {
      const validData = {
        ...validGuestData,
        phone: '1234567890'
      };
 
      const response = await request(app)
        .post('/api/guest')
        .send(validData);
 
      expect(response.status).to.equal(201);
    });
  });
 
});
 