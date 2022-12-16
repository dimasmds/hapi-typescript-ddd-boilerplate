import { CreatedUser } from '@Domains/users/entities';

export interface UsersRepository {
  checkAvailableEmail(email: string): Promise<boolean>
  persistUser(createdUser: CreatedUser): Promise<void>
  findByEmail(email: string): Promise<CreatedUser | null>
}
