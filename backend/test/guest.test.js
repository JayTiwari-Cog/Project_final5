import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Guest Controller API', () => {
  describe('POST /api/guest - Simple Validation Tests', () => {
    it('should fail when fullName is missing', async () => {
      const invalidData = {
        email: 'john@example.com',
        country: 'United States',
        phone: '1234567890'
      };
      const response = await request(app).post('/api/guest').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Full name is required');
    });

    it('should fail when email is missing', async () => {
      const invalidData = {
        fullName: 'John Doe',
        country: 'United States',
        phone: '1234567890'
      };
      const response = await request(app).post('/api/guest').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Email is required');
    });
  });
});