import { Server } from '@hapi/hapi';
import { createServer } from '@Infrastructures/http';

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
});
