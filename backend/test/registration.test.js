 import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import User from '../models/User.js';
import UserCreds from '../models/UserCreds.js';
 
describe('User Registration API', () => {
  // Test data
  const validUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'Password123',
    confirmPassword: 'Password123',
    agreeTerms: true
  };
 
  // Store original methods to restore later
  let originalUserFindOne;
  let originalUserCreate;
  let originalUserCredsCreate;
 
  // Mock database operations before all tests
  before(() => {
    // Store original methods
    originalUserFindOne = User.findOne;
    originalUserCreate = User.create;
    originalUserCredsCreate = UserCreds.create;
 
    // Mock User.findOne to return null (no existing user)
    User.findOne = async () => null;
   
    // Mock User.create to return a mock user
    User.create = async (userData) => ({
      _id: 'mock-user-id-12345',
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      createdAt: new Date()
    });
   
    // Mock UserCreds.create to return mock credentials
    UserCreds.create = async (credData) => ({
      _id: 'mock-creds-id-12345',
      email: credData.email,
      password: credData.password
    });
  });
 
  // Restore original methods after all tests
  after(() => {
    User.findOne = originalUserFindOne;
    User.create = originalUserCreate;
    UserCreds.create = originalUserCredsCreate;
  });
 
  describe('POST /api/register - Validation Tests', () => {
    it('should fail when name is too short', async () => {
      const invalidData = {
        ...validUserData,
        name: 'Jo'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Name must be at least 3 characters long');
    });
 
    it('should fail when name contains numbers', async () => {
      const invalidData = {
        ...validUserData,
        name: 'John123'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Name should contain only letters and spaces');
    });
 
    it('should fail when email format is invalid', async () => {
      const invalidData = {
        ...validUserData,
        email: 'invalid-email'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Please enter a valid email address');
    });
 
    it('should fail when phone number is too short', async () => {
      const invalidData = {
        ...validUserData,
        phoneNumber: '123456789'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Phone number must be between 7 and 15 digits');
    });
 
    it('should fail when password is too short', async () => {
      const invalidData = {
        ...validUserData,
        password: 'abc12',
        confirmPassword: 'abc12'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Password must be at least 6 characters long');
    });
 
    it('should fail when passwords do not match', async () => {
      const invalidData = {
        ...validUserData,
        password: 'Password123',
        confirmPassword: 'DifferentPassword123'
      };
 
      const response = await request(app)
        .post('/api/register')
        .send(invalidData);
 
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Passwords do not match');
    });
  });
 
  describe('POST /api/register - Success Case', () => {
    it('should successfully register a user with all valid data', async () => {
      const response = await request(app)
        .post('/api/register')
        .send(validUserData);
 
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('message');
    });
  });
});
 