import { UsersRepository } from '@Domains/users/repositories';
import { CreatedUser, User } from '@Domains/users/entities';
import { database } from '@Infrastructures/sqlite';
import { Database } from 'better-sqlite3';

class UsersRepositorySQLite implements UsersRepository {
  private database: Database;

  constructor() {
    this.database = database;
  }

  async checkAvailableEmail(email: string): Promise<boolean> {
    const result = await this.database.prepare(
      'SELECT email FROM users WHERE email = ?',
    ).get(email);

    return !!result;
  }

  async persistUser(createdUser: CreatedUser): Promise<void> {
    const {
      id, name, email, password, avatar,
    } = createdUser;

    await this.database.prepare(`
      INSERT INTO users (id, name, email, hashed_password, avatar) VALUES (?, ?, ?, ?, ?)
    `).run(id, name, email, password, avatar);
  }

  async findByEmail(email: string): Promise<CreatedUser> {
    const result = await this.database.prepare(
      'SELECT * FROM users WHERE email = ?',
    ).get(email);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      password: result.hashed_password,
      avatar: result.avatar,
    };
  }

  async findById(id: string): Promise<User> {
    const result = await this.database.prepare(
      'SELECT * FROM users WHERE id = ?',
    ).get(id);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    };
  }

  async isUserExist(id: string): Promise<boolean> {
    const result = await this.database.prepare(
      'SELECT id FROM users WHERE id = ?',
    ).get(id);

    return !!result;
  }
}

export default UsersRepositorySQLite;
