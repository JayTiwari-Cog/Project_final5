import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
 
describe('Login Controller API', () => {
  const validLoginData = {
    email: 'john.doe@example.com',
    password: 'password123'
  };
 
  describe('POST /api/login - Validation Tests', () => {
    it('should fail when email is missing', async () => {
      const invalidData = { ...validLoginData, email: undefined };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Email is required');
    });
 
    it('should fail when email format is invalid', async () => {
      const invalidData = { ...validLoginData, email: 'invalid-email' };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Please enter a valid email address');
    });
 
    it('should fail when password is missing', async () => {
      const invalidData = { ...validLoginData, password: undefined };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Password is required');
    });
 
    it('should fail when password is too short', async () => {
      const invalidData = { ...validLoginData, password: '123' };
      const response = await request(app).post('/api/login').send(invalidData);
     
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Password must be at least 6 characters long');
    });
  });
});
 