import { createServer } from '@Infrastructures/http';
import { applicationEventSubscriber } from '@Interfaces/event';

(async () => {
  const server = await createServer();
  await server.start();

  applicationEventSubscriber();
  console.log(`Server running at: ${server.info.uri}`);
})();
