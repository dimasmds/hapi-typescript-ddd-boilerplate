import { ApplicationUseCase } from '@Applications/usecase/base';

class SampleUseCase extends ApplicationUseCase<string, string> {
  protected run(payload: string): Promise<string> {
    return Promise.resolve(`Hello ${payload}`);
  }
}

export default SampleUseCase;
