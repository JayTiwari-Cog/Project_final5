import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
 
describe('User Registration API', () => {
  const validUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'Password123',
    confirmPassword: 'Password123'
  };
 
  describe('POST /api/register - Simple Validation Tests', () => {
    it('should fail when passwords do not match', async () => {
      const invalidData = { ...validUserData, confirmPassword: 'DifferentPassword' };
      const response = await request(app).post('/api/register').send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Passwords do not match');
    });

    it('should fail when required fields are missing', async () => {
      const invalidData = { name: 'John' };
      const response = await request(app).post('/api/register').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('All fields are required');
    });
  });
});