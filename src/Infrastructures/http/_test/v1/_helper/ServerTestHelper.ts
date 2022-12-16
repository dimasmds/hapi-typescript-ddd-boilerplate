/* istanbul ignore file */
import { createServer } from '@Infrastructures/http';
import container from '@Infrastructures/container';

const ServerTestHelper = {
  async registerUser({ email = 'dimas@dicoding.com', password = '123456', name = 'Dimas' }: any = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/v1/register',
      payload: {
        email,
        password,
        name,
      },
    });

    return JSON.parse(response.payload);
  },

  async loginUser({ email = 'dimas@dicoding.com', password = '123456' }: any = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/v1/login',
      payload: {
        email,
        password,
      },
    });

    return JSON.parse(response.payload);
  },
};

export default ServerTestHelper;
