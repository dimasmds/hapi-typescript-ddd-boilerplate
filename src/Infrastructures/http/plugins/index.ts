import { Container } from 'instances-container';
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';
import Inert from '@hapi/inert';
import users from '@Interfaces/http/api/v1/users';

type InternalPluginOptions = {
  container: Container
}

function externalPlugins(): ServerRegisterPluginObject<any>[] {
  return [
    {
      plugin: Inert,
    },
  ];
}

function internalPlugins(options: InternalPluginOptions): ServerRegisterPluginObject<any>[] {
  return [
    {
      plugin: users,
      options,
      routes: {
        prefix: '/v1',
      },
    },
  ];
}

export async function registerExternalPlugins(server: Server) {
  await server.register(externalPlugins());
}

export async function registerInternalPlugins(server: Server, options: InternalPluginOptions) {
  await server.register(internalPlugins(options));
}
