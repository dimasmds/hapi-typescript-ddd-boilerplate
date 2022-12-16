import { Container } from 'instances-container';
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';
import Inert from '@hapi/inert';

type InternalPluginOptions = {
  container: Container
}

function externalPlugins(): ServerRegisterPluginObject<unknown>[] {
  return [
    {
      plugin: Inert,
    },
  ];
}

function internalPlugins(options: InternalPluginOptions): ServerRegisterPluginObject<unknown>[] {
  return [];
}

export async function registerExternalPlugins(server: Server) {
  await server.register(externalPlugins());
}

export async function registerInternalPlugins(server: Server, options: InternalPluginOptions) {
  await server.register(internalPlugins(options));
}
