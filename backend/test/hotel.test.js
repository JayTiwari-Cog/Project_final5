import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import Hotel from '../models/Hotel.js';
 
describe('Hotel Controller API', () => {
  const validHotelData = {
    hotelName: 'Grand Plaza Hotel',
    roomType: ['Single', 'Double'],
    amenities: ['WiFi', 'Parking'],
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      postalCode: '400001'
    },
    pricePerNight: 5000
  };
 
  let originalHotelCreate;
 
  before(() => {
    originalHotelCreate = Hotel.create;
    Hotel.create = async (hotelData) => ({
      _id: 'mock-hotel-id-12345',
      ...hotelData,
      createdAt: new Date()
    });
  });
 
  after(() => {
    Hotel.create = originalHotelCreate;
  });
 
  describe('POST /api/hotel - Validation Tests', () => {
    it('should fail when hotel name is missing', async () => {
      const invalidData = { ...validHotelData, hotelName: undefined };
      const response = await request(app).post('/api/hotel').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Hotel name is required');
    });
 
    it('should fail when room type is empty array', async () => {
      const invalidData = { ...validHotelData, roomType: [] };
      const response = await request(app).post('/api/hotel').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('At least one room type is required');
    });
 
    it('should fail when postal code is invalid', async () => {
      const invalidData = {
        ...validHotelData,
        address: { ...validHotelData.address, postalCode: '1234' }
      };
      const response = await request(app).post('/api/hotel').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Postal code must be 6 digits');
    });
 
    it('should fail when price is zero', async () => {
      const invalidData = { ...validHotelData, pricePerNight: 0 };
      const response = await request(app).post('/api/hotel').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Price must be greater than 0');
    });
  });
 
  describe('POST /api/hotel - Success Case', () => {
    it('should successfully add hotel with valid data', async () => {
      const response = await request(app).post('/api/hotel').send(validHotelData);
     
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Hotel added successfully');
      expect(response.body).to.have.property('hotelId');
    });
  });
});
 