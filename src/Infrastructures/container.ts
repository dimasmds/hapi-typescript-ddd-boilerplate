import { createContainer } from 'instances-container';
import ApplicationEventImpl from '@Infrastructures/event/ApplicationEventImpl';
import FileLogger from '@Infrastructures/logging/local/FileLogger';

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

/**
 * @do register other service to the container
 */

export default container;
