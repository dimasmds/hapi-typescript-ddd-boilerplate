import { UsersRepository } from '@Domains/users/repositories';
import { NewUser, User } from '@Domains/users/entities';
import InvariantError from '@Commons/exceptions/InvariantError';
import { PasswordHash } from '@Domains/users/securities';
import { IdGenerator } from '@Domains/commons/utils';
import { AvatarGenerator } from '@Domains/users/utils';

class UserCreationAggregate {
  private usersRepository: UsersRepository;

  private passwordHash: PasswordHash;

  private idGenerator: IdGenerator;

  private avatarGenerator: AvatarGenerator;

  constructor(
    usersRepository: UsersRepository,
    passwordHash: PasswordHash,
    idGenerator: IdGenerator,
    avatarGenerator: AvatarGenerator,
  ) {
    this.usersRepository = usersRepository;
    this.passwordHash = passwordHash;
    this.idGenerator = idGenerator;
    this.avatarGenerator = avatarGenerator;
  }

  public async createUser(newUser: NewUser): Promise<User> {
    if (newUser.password.length < 6) {
      throw new InvariantError('password must be at least 6 characters long');
    }

    const isEmailTaken = await this.usersRepository.checkAvailableEmail(newUser.email);

    if (isEmailTaken) {
      throw new InvariantError('email is already taken');
    }

    const hashedPassword = await this.passwordHash.hash(newUser.password);
    const id = await this.idGenerator.generate('user-');
    const avatar = await this.avatarGenerator.generate(newUser.name);

    const createdUser = {
      id,
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      avatar,
    };

    await this.usersRepository.persistUser(createdUser);

    delete createdUser.password;

    return createdUser;
  }
}

export default UserCreationAggregate;
