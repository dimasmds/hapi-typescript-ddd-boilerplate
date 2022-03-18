import * as events from 'events';
import { ApplicationEvent, ApplicationUseCase } from '@Applications/usecase/base';

class ApplicationEventImpl extends events.EventEmitter implements ApplicationEvent {
  async raise(useCase: ApplicationUseCase<any, any>, data?: any): Promise<void> {
    this.emit(useCase.name, data);
  }

  // eslint-disable-next-line no-unused-vars
  subscribe(useCase: ApplicationUseCase<any, any>, callback: (data?: any) => void): void {
    this.on(useCase.name, callback);
  }
}

export default ApplicationEventImpl;
