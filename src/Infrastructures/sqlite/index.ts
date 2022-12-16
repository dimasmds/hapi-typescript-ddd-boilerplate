import DB, { Database } from 'better-sqlite3';
import config from '@Commons/config';

const migrateTable = (database: Database) => {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      hashed_password TEXT NOT NULL,
      avatar TEXT NOT NULL
      );
   `;

  database.exec(query);
};

const createDatabase = () => {
  const database = new DB(config.sqlite.database);
  migrateTable(database);
  return database;
};

// noinspection JSUnusedGlobalSymbols
export const database = createDatabase();
