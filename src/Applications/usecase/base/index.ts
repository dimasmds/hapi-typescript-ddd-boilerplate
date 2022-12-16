/* eslint-disable no-use-before-define,no-unused-vars */
import { UsersRepository } from '@Domains/users/repositories';
import { PasswordHash } from '@Domains/users/securities';
import { IdGenerator } from '@Domains/commons/utils';
import { AvatarGenerator } from '@Domains/users/utils';
import { Tokenize } from '@Domains/authentications/tokenize';

export abstract class ApplicationUseCase<Input, Output> {
  protected applicationEvent: ApplicationEvent;

  public name: string;

  protected constructor({ applicationEvent } : UseCaseDependencies) {
    this.applicationEvent = applicationEvent;
    this.name = this.constructor.name;
  }

  protected abstract run(payload: Input): Promise<Output>;

  async execute(payload: Input): Promise<Output> {
    const output = await this.run(payload);
    await this.applicationEvent.raise(this, {
      input: payload,
      output,
    });

    return output;
  }
}

export interface ApplicationEvent {
  raise(useCase: ApplicationUseCase<any, any>, data?: any): Promise<void>;
  subscribe(useCase: ApplicationUseCase<any, any>, callback: (data?: any) => void): void;
}

export type UseCaseDependencies = {
  applicationEvent?: ApplicationEvent;
  usersRepository?: UsersRepository;
  passwordHash?: PasswordHash;
  idGenerator?: IdGenerator;
  avatarGenerator?: AvatarGenerator;
  tokenize: Tokenize
};
