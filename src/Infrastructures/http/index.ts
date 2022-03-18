import Hapi from '@hapi/hapi';
import config from '@Commons/config';

export const createServer = async () => {
  const server = new Hapi.Server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: true,
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World!',
  });

  return server;
};
