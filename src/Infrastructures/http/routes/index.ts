import { ServerRoute } from '@hapi/hapi';
import { resolve } from 'path';

export function routes(): ServerRoute[] {
  return [
    {
      method: 'GET',
      path: '/',
      handler: () => 'Hello World!',
    },
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: resolve(__dirname, '../../../Interfaces/http/public'),
        },
      },
    },
  ];
}
