import { ServerOptions } from '@hapi/hapi';
import config from '@Commons/config';

export const options: ServerOptions = {
  host: config.app.host,
  port: config.app.port,
  routes: {
    cors: true,
  },
};
