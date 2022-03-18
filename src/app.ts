import { createServer } from '@Infrastructures/http';

(async () => {
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
})();
