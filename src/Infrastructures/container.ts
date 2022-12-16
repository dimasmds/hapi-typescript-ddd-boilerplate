import { createContainer, ParameterOption } from 'instances-container';
import ApplicationEventImpl from '@Infrastructures/event/ApplicationEventImpl';
import FileLogger from '@Infrastructures/logging/local/FileLogger';
import SampleUseCase from '@Applications/usecase/sample/SampleUseCase';
import UsersRepositorySQLite from '@Infrastructures/repositories/UsersRepositorySQLite';
import PasswordHashBcrypt from '@Infrastructures/securities/PasswordHashBcrypt';
import IdGeneratorNano from '@Infrastructures/utils/IdGeneratorNano';
import UIAvatarsGenerator from '@Infrastructures/utils/UIAvatarsGenerator';
import JwtTokenize from '@Infrastructures/tokenize/JwtTokenize';
import UserCreationUseCase from '@Applications/usecase/users/UserCreationUseCase';
import UserLoginUseCase from '@Applications/usecase/users/UserLoginUseCase';

const useCaseParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'applicationEvent',
      internal: 'ApplicationEvent',
    },
    {
      name: 'usersRepository',
      internal: 'UsersRepository',
    },
    {
      name: 'passwordHash',
      internal: 'PasswordHash',
    },
    {
      name: 'idGenerator',
      internal: 'IdGenerator',
    },
    {
      name: 'avatarGenerator',
      internal: 'AvatarGenerator',
    },
    {
      name: 'tokenize',
      internal: 'Tokenize',
    },
  ],
};

const container = createContainer();

/** Application General */
container.register([
  {
    key: 'ApplicationEvent',
    Class: ApplicationEventImpl,
  },
  {
    key: 'Logger',
    Class: FileLogger,
  },
]);

/** Repositories */
container.register([
  {
    key: 'UsersRepository',
    Class: UsersRepositorySQLite,
  },
]);

/** Other Services */
container.register([
  {
    key: 'PasswordHash',
    Class: PasswordHashBcrypt,
  },
  {
    key: 'IdGenerator',
    Class: IdGeneratorNano,
  },
  {
    key: 'AvatarGenerator',
    Class: UIAvatarsGenerator,
  },
  {
    key: 'Tokenize',
    Class: JwtTokenize,
  },
]);

/** Usecase */

container.register([
  {
    Class: SampleUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: UserCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: UserLoginUseCase,
    parameter: useCaseParameter,
  },
]);

/**
 * @do register other service to the container
 */

export default container;
