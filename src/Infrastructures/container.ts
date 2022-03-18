import { createContainer } from 'instances-container';
import ApplicationEventImpl from '@Infrastructures/event/ApplicationEventImpl';

const container = createContainer();

/** Application Event */
container.register({
  key: 'ApplicationEvent',
  Class: ApplicationEventImpl,
});

/**
 * @do register other service to the container
 */

export default container;
