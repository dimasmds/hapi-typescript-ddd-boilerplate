import { ServerRoute } from '@hapi/hapi';
import UsersHandler from '@Interfaces/http/api/v1/users/handler';

const routes = (handler: UsersHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.postUserHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: handler.postLoginHandler,
  },
];

export default routes;
