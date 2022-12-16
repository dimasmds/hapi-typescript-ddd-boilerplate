import { Server } from '@hapi/hapi';
import { createServer } from '@Infrastructures/http';
import InvariantError from '@Commons/exceptions/InvariantError';

describe('createServer', () => {
  let server: Server;

  beforeAll(async () => {
    server = await createServer();
  });

  describe('when GET /', () => {
    it('should return 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('when GET /error', () => {
    it('should return 500', async () => {
      server.route({
        method: 'GET',
        path: '/error',
        handler: () => {
          throw new Error('error');
        },
      });

      const response = await server.inject({
        method: 'GET',
        url: '/error',
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('when GET /client-error', () => {
    it('should return 400', async () => {
      server.route({
        method: 'GET',
        path: '/client-error',
        handler: () => {
          throw new InvariantError('client-error');
        },
      });

      const response = await server.inject({
        method: 'GET',
        url: '/client-error',
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('when GET /not-found', () => {
    it('should return 404', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/not-found',
      });

      expect(response.statusCode).toBe(404);
    });
  });
});
