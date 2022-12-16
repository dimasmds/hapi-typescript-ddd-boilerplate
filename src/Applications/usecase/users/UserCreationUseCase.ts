import { ApplicationUseCase, UseCaseDependencies } from '@Applications/usecase/base';
import { NewUser, User } from '@Domains/users/entities';
import { UsersRepository } from '@Domains/users/repositories';
import { PasswordHash } from '@Domains/users/securities';
import { IdGenerator } from '@Domains/commons/utils';
import { AvatarGenerator } from '@Domains/users/utils';
import UserCreationAggregate from '@Domains/users/aggregates/UserCreationAggregate';

class UserCreationUseCase extends ApplicationUseCase<NewUser, User> {
  private readonly usersRepository: UsersRepository;

  private readonly passwordHash: PasswordHash;

  private readonly idGenerator: IdGenerator;

  private readonly avatarGenerator: AvatarGenerator;

  constructor(dependencies: UseCaseDependencies) {
    super(dependencies);

    const {
      usersRepository, passwordHash, avatarGenerator, idGenerator,
    } = dependencies;

    this.usersRepository = usersRepository;
    this.passwordHash = passwordHash;
    this.avatarGenerator = avatarGenerator;
    this.idGenerator = idGenerator;
  }

  protected run(payload: NewUser): Promise<User> {
    const aggregate = new UserCreationAggregate(
      this.usersRepository,
      this.passwordHash,
      this.idGenerator,
      this.avatarGenerator,
    );

    return aggregate.createUser(payload);
  }
}

export default UserCreationUseCase;
