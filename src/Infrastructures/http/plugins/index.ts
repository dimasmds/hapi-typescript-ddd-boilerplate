import { Container } from 'instances-container';
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';

type InternalPluginOptions = {
  container: Container
}

function externalPlugins(): ServerRegisterPluginObject<unknown>[] {
  return [];
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
