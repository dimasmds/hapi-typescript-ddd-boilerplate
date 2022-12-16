import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import UserCreationUseCase from '@Applications/usecase/users/UserCreationUseCase';
import UserLoginUseCase from '@Applications/usecase/users/UserLoginUseCase';
import UsersRouteValidator from './validator';

class UsersHandler {
  private container: Container;

  private validator: UsersRouteValidator;

  constructor(container: Container, validator: UsersRouteValidator) {
    this.container = container;
    this.validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.postLoginHandler = this.postLoginHandler.bind(this);
  }

  async postUserHandler(request: Request, h: ResponseToolkit) {
    const payload = this.validator.validatePostUser(request.payload);
    const useCase = this.container.getInstance(UserCreationUseCase.name) as UserCreationUseCase;

    const user = await useCase.execute(payload);

    const response = h.response({
      status: 'success',
      message: 'user created',
      data: {
        user,
      },
    });
    response.code(201);
    return response;
  }

  async postLoginHandler(request: Request, h: ResponseToolkit) {
    const payload = this.validator.validateLoginUser(request.payload);
    const useCase = this.container.getInstance(UserLoginUseCase.name) as UserLoginUseCase;

    const authenticated = await useCase.execute(payload);

    const response = h.response({
      status: 'success',
      message: 'user logged in',
      data: {
        token: authenticated.token,
      },
    });
    response.code(200);
    return response;
  }
}

export default UsersHandler;
