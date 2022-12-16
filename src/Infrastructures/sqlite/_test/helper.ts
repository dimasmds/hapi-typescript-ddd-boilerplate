import { database } from '@Infrastructures/sqlite';

const UsersTableHelper = {
  async cleanTable() {
    await database.prepare('DELETE FROM users').run();
  },
};

export { UsersTableHelper };
