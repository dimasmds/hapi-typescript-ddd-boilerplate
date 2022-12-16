import { createContainer, ParameterOption } from 'instances-container';
import ApplicationEventImpl from '@Infrastructures/event/ApplicationEventImpl';
import FileLogger from '@Infrastructures/logging/local/FileLogger';
import SampleUseCase from '@Applications/usecase/sample/SampleUseCase';

const useCaseParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'applicationEvent',
      internal: 'ApplicationEvent',
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

/** Usecase */

container.register([
  {
    Class: SampleUseCase,
    parameter: useCaseParameter,
  },
]);

/**
 * @do register other service to the container
 */

export default container;
