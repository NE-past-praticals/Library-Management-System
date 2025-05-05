const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User created successfully');
  });

  test('should not register duplicate user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser2', password: 'testpass' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser2', password: 'testpass' });
    expect(res.statusCode).toBe(400);
  });

  test('should login user and return token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'loginuser', password: 'testpass' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'loginuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'loginuser', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});
