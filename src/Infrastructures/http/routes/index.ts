import { ServerRoute } from '@hapi/hapi';

export function routes(): ServerRoute[] {
  return [
    {
      method: 'GET',
      path: '/',
      handler: () => 'Hello World!',
    },
  ];
}
