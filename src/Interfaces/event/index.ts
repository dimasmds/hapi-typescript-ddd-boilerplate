import container from '@Infrastructures/container';
import { ApplicationEvent, ApplicationUseCase } from '@Applications/usecase/base';
import SampleUseCase from '@Applications/usecase/sample/SampleUseCase';
import { sampleListener } from '@Interfaces/event/listeners/sampleListener';

const subscribers = {
  [SampleUseCase.name]: [
    sampleListener,
  ],
};

export const applicationEventSubscriber = () => {
  const applicationEvent = container.getInstance('ApplicationEvent') as ApplicationEvent;

  Object.keys(subscribers).forEach((useCaseKey) => {
    const useCase = container.getInstance(useCaseKey) as ApplicationUseCase<any, any>;
    subscribers[useCaseKey].forEach((subscriber) => {
      applicationEvent.subscribe(useCase, subscriber);
    });
  });
};
