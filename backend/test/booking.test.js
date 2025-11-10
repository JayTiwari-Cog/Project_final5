import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
 
describe('Booking Controller API', () => {
  describe('POST /api/booking - Simple Validation Tests', () => {
    it('should require authentication token', async () => {
      const bookingData = {
        userId: '507f1f77bcf86cd799439011',
        hotelName: 'Test Hotel',
        guests: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        startDate: '2025-12-01T00:00:00.000Z',
        endDate: '2025-12-05T00:00:00.000Z'
      };
      
      const response = await request(app).post('/api/booking').send(bookingData);
     
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('No token provided or invalid format');
    });

    it('should require authentication for getting bookings', async () => {
      const response = await request(app).get('/api/bookings');
     
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('No token provided or invalid format');
    });
  });
});