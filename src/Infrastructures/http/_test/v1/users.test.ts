import { Server } from '@hapi/hapi';
import { createServer } from '@Infrastructures/http';
import container from '@Infrastructures/container';
import { UsersTableHelper } from '@Infrastructures/sqlite/_test/helper';
import ServerTestHelper from '@Infrastructures/http/_test/v1/_helper/ServerTestHelper';

describe('/users', () => {
  let server: Server;

  beforeAll(async () => {
    server = await createServer(container);
  });

  describe('POST /v1/register', () => {
    beforeEach(async () => {
      await UsersTableHelper.cleanTable();
    });

    it('should response 400 when input validation failed', async () => {
      // Arrange
      const requestPayload = {
        name: 'Dicoding',
        email: 'dicoding',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 400 when password is less than 6 characters', async () => {
      const payload = {
        name: 'user',
        email: 'admin@dicoding.com',
        password: '12345',
      };

      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload,
      });

      const payloadResponse = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);

      expect(payloadResponse).toEqual({
        status: 'fail',
        message: 'password must be at least 6 characters long',
        data: {},
      });
    });

    it('should return 201 and correct body response', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: {
          name: 'John Doe',
          email: 'x@y.com',
          password: 'secret',
        },
      });

      const responsePayload = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);

      expect(responsePayload.status).toEqual('success');
      expect(responsePayload.message).toEqual('user created');
      expect(responsePayload.data.user.id).toBeDefined();
      expect(responsePayload.data.user.name).toEqual('John Doe');
      expect(responsePayload.data.user.email).toEqual('x@y.com');
      expect(responsePayload.data.user.password).toBeUndefined();
      expect(responsePayload.data.user.avatar).toBeDefined();
    });

    it('should return 400 when email already exists', async () => {
      await ServerTestHelper.registerUser({ email: 'dimas@dicoding.com' });

      const response = await server.inject({
        method: 'POST',
        url: '/v1/register',
        payload: {
          name: 'John Doe',
          email: 'dimas@dicoding.com',
          password: 'secret',
        },
      });

      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);

      expect(responsePayload.status).toEqual('fail');
      expect(responsePayload.message).toEqual('email is already taken');
    });
  });

  describe('POST /v1/login', () => {
    beforeEach(async () => {
      await UsersTableHelper.cleanTable();
    });

    it('should return 400 when input validation error', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/login',
        payload: {
          email: 'dicoding',
        },
      });

      const responsePayload = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responsePayload.status).toEqual('fail');
    });

    it('should return 401 when user not found', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/login',
        payload: {
          email: 'admin@dicoding.com',
          password: 'secret',
        },
      });

      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responsePayload.status).toEqual('fail');
      expect(responsePayload.message).toEqual('email or password is wrong');
    });

    it('should return 401 when password is wrong', async () => {
      await ServerTestHelper.registerUser({ email: 'admin@dicoding.com', password: 'secret' });

      const response = await server.inject({
        method: 'POST',
        url: '/v1/login',
        payload: {
          email: 'admin@dicoding.com',
          password: 'wrong_password',
        },
      });

      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responsePayload.status).toEqual('fail');
      expect(responsePayload.message).toEqual('email or password is wrong');
    });

    it('should return 200 and correct body response', async () => {
      await ServerTestHelper.registerUser({ email: 'admin@dicoding.com', password: 'secret' });

      const response = await server.inject({
        method: 'POST',
        url: '/v1/login',
        payload: {
          email: 'admin@dicoding.com',
          password: 'secret',
        },
      });

      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responsePayload.status).toEqual('success');
      expect(responsePayload.message).toEqual('user logged in');
      expect(responsePayload.data.token).toBeDefined();
    });
  });
});
