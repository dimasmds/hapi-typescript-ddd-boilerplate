import { ApplicationUseCase, UseCaseDependencies } from '@Applications/usecase/base';
import { UserLogin } from '@Domains/users/entities';
import { Authenticated } from '@Domains/authentications/entities';
import { UsersRepository } from '@Domains/users/repositories';
import { PasswordHash } from '@Domains/users/securities';
import { Tokenize } from '@Domains/authentications/tokenize';
import UserLoginAggregate from '@Domains/users/aggregates/UserLoginAggregate';

class UserLoginUseCase extends ApplicationUseCase<UserLogin, Authenticated> {
  private readonly userRepository: UsersRepository;

  private readonly passwordHash: PasswordHash;

  private tokenize: Tokenize;

  constructor(dependencies: UseCaseDependencies) {
    super(dependencies);

    const { usersRepository, passwordHash, tokenize } = dependencies;

    this.userRepository = usersRepository;
    this.passwordHash = passwordHash;
    this.tokenize = tokenize;
  }

  protected async run({ email, password }: UserLogin): Promise<Authenticated> {
    const aggregate = new UserLoginAggregate(this.userRepository, this.passwordHash);
    const createdUser = await aggregate.login({ email, password });
    const token = await this.tokenize.createAccessToken({ id: createdUser.id });
    return {
      token,
    };
  }
}

export default UserLoginUseCase;
