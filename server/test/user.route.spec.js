require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const { models } = require('../src/db/sequelize');
const e = require('express');


describe('User routes', () => {
  let UserId;
  let response;

  describe('GET /api/users', () => {
    beforeAll(async () => {
      response = (await request(app).get('/api/users')).send();
    });
    it('should return all User', async () => {
      const users = await models.User.findAll();
      expect(users).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/users', () => {
    beforeAll(async () => {
      response = (await request(app).post('/api/users')).send({
        name: 'test',
        lastname: 'last-test',
        email: 'test@email.com',
      });
    });
    it('should create a new User', async () => {
      expect(response.status).toEqual(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'test',
        lastname: 'last-test',
        email: 'test@email.com',
      });
      expect(response.body).toHaveProperty('id');
      UserId = response.body.id;
    });
  });

  describe('GET /api/users/:id', () => {
    beforeAll(async () => {
      response = (await request(app).get(`/api/users/${UserId}`)).send();
    });
    it('should return a User', async () => {
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'test',
        lastname: 'last-test',
        email: 'test@email.com',
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /api/users/:id', () => {
    beforeAll(async () => {
      response = (await request(app).put(`/api/users/${UserId}`)).send({
        name: 'test2',
        lastname: 'last-test2',
      });
    });
    it('should update a User', async () => {
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toMatchObject({
        name: 'test2',
        lastname: 'last-test2',
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toEqual(UserId);
      expect(response.name).toEqual('test2');
      expect(response.lastname).toEqual('last-test2');
    });
  });

  describe('DELETE /api/users/:id', () => {
    beforeAll(async () => {
      response = (await request(app).delete(`/api/users/${UserId}`)).send();
    });
    it('should delete a User', async () => {
      expect(response.status).toEqual(200);
    });
    it ('should return 404 if User not found', async () => {
      const response = (await request(app).delete(`/api/users/${UserId}`)).send();
      expect(response.status).toEqual(404);
    });
  });

});
