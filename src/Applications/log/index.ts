export type Event = {
  type: string;
  payload: unknown;
}

export interface Logger {
  writeError(error: Error): Promise<void>;
  writeClientError(error: Error): Promise<void>;
  writeEvent(event: Event): Promise<void>;
}
