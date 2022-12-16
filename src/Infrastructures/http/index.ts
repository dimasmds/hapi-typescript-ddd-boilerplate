import Hapi from '@hapi/hapi';
import { options } from '@Infrastructures/http/config';
import { registerExternalPlugins, registerInternalPlugins } from '@Infrastructures/http/plugins';
import { preResponseMiddleware } from '@Infrastructures/http/utils';
import container from '@Infrastructures/container';
import { routes } from '@Infrastructures/http/routes';

export const createServer = async () => {
  const server = Hapi.server(options);

  await registerExternalPlugins(server);
  await registerInternalPlugins(server, { container });

  // interpreting the response
  server.ext('onPreResponse', preResponseMiddleware);

  // initial route
  server.route(routes());

  return server;
};
