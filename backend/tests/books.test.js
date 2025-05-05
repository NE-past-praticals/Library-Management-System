const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const User = require('../models/User');
const Book = require('../models/Book');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await request(app).post('/api/auth/register').send({ username: 'bookuser', password: 'testpass' });
  const res = await request(app).post('/api/auth/login').send({ username: 'bookuser', password: 'testpass' });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Book Endpoints', () => {
  let bookId;

  test('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Book',
        author: 'Author',
        description: 'Some description',
        publishedYear: 2020
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
    bookId = res.body.id;
  });

  test('should get all books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should get book by id', async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(bookId);
  });

  test('should update a book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('should delete a book', async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

  test('should not allow unauthenticated access', async () => {
    const res = await request(app)
      .get('/api/books');
    expect(res.statusCode).toBe(401);
  });
});
