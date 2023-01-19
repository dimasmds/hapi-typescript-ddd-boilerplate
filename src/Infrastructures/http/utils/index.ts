import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import ClientError from '@Commons/exceptions/ClientError';
import container from '@Infrastructures/container';
import { Logger } from '@Applications/log';
import { Boom } from '@hapi/boom';

export function secureResponse(response: ResponseObject) {
  response.header('Content-Security-Policy', 'upgrade-insecure-requests');
  response.header('referrer-policy', 'strict-origin-when-cross-origin');
  response.header('X-Frame-Options', 'DENY');
  response.header('X-Content-Type-Options', 'nosniff');
  response.header('X-XSS-Protection', '1; mode=block');
  return response;
}

export async function preResponseMiddleware(request: Request, h: ResponseToolkit) {
  const { response } = request as { response: ResponseObject | Boom };
  const logger = container.getInstance('Logger') as Logger;

  if (response instanceof Error) {
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
        data: {},
      });

      newResponse.code(response.statusCode);

      await logger.writeClientError(response);
      return secureResponse(newResponse);
    }

    if (!response.isServer) {
      const newResponse = h.response({
        status: 'fail',
        message: response.output.payload.message,
        data: {},
      });

      newResponse.code(response.output.statusCode);
      await logger.writeClientError(response);
      return secureResponse(newResponse);
    }

    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kesalahan pada server kami',
      data: {},
    });

    newResponse.code(500);
    await logger.writeError(response);
    return secureResponse(newResponse);
  }

  return secureResponse(response);
}
