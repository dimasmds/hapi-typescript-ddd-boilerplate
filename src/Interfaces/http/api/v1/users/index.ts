import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import UsersHandler from '@Interfaces/http/api/v1/users/handler';
import UsersRouteValidator from '@Interfaces/http/api/v1/users/validator';
import routes from '@Interfaces/http/api/v1/users/routes';

const users = {
  name: 'users',
  register: async (server: Server, { container }: { container: Container }) => {
    const validator = new UsersRouteValidator();
    const handler = new UsersHandler(container, validator);

    server.route(routes(handler));
  },
};

export default users;
