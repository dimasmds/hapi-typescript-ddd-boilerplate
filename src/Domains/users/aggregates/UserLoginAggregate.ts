import { UsersRepository } from '@Domains/users/repositories';
import { PasswordHash } from '@Domains/users/securities';
import { CreatedUser, UserLogin } from '@Domains/users/entities';
import AuthenticationError from '@Commons/exceptions/AuthenticationError';

class UserLoginAggregate {
  private passwordHash: PasswordHash;

  private userRepository: UsersRepository;

  constructor(userRepository: UsersRepository, passwordHash: PasswordHash) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async login({ email, password }: UserLogin): Promise<CreatedUser> {
    const createdUser = await this.userRepository.findByEmail(email);

    if (!createdUser) {
      throw new AuthenticationError('email or password is wrong');
    }

    const isPasswordMatch = await this.passwordHash.compare(createdUser.password, password);

    if (!isPasswordMatch) {
      throw new AuthenticationError('email or password is wrong');
    }

    return createdUser;
  }
}

export default UserLoginAggregate;
