import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
 
describe('Hotel Controller API', () => {
  describe('POST /api/hotel - Simple Validation Tests', () => {
    it('should require authentication token', async () => {
      const hotelData = {
        hotelName: 'Test Hotel',
        roomType: ['Single'],
        amenities: ['WiFi'],
        address: {
          street: '123 Main St',
          city: 'Mumbai',
          postalCode: '400001'
        },
        pricePerNight: 5000
      };
      
      const response = await request(app).post('/api/hotel').send(hotelData);
     
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('No token provided or invalid format');
    });

    it('should require authentication for getting hotels', async () => {
      const response = await request(app).get('/api/hotel');
     
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('No token provided or invalid format');
    });
  });
});