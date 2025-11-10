import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
 
describe('Login Controller API', () => {
  describe('POST /api/login - Simple Validation Tests', () => {
    it('should fail when email is missing', async () => {
      const invalidData = { password: 'password123' };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields are required');
    });
 
    it('should fail when password is missing', async () => {
      const invalidData = { email: 'test@example.com' };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields are required');
    });
  });
});
 