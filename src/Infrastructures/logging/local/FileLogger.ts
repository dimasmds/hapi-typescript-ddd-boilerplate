/* istanbul ignore file */

import { Event, Logger } from '@Applications/log';
import * as fs from 'fs';
import { createSimpleFileLogger } from 'simple-node-logger';
import { resolve } from 'path';

class FileLogger implements Logger {
  async writeClientError(error: Error): Promise<void> {
    const filePath = resolve(process.cwd(), 'logs/error/client');
    const fileName = `${FileLogger.getCurrentDate()}.log`;

    FileLogger.createLogFileIfItNotExists(filePath, fileName);

    const log = createSimpleFileLogger(`${filePath}/${fileName}`);

    log.error({
      time: new Date().toISOString(),
      stack: error.stack,
      error,
    });
  }

  async writeError(error: Error): Promise<void> {
    const filePath = resolve(process.cwd(), 'logs/error/');
    const fileName = `${FileLogger.getCurrentDate()}.log`;

    FileLogger.createLogFileIfItNotExists(filePath, fileName);

    const log = createSimpleFileLogger(`${filePath}/${fileName}`);

    log.error({
      time: new Date().toISOString(),
      stack: error.stack,
      error,
    });
  }

  async writeEvent({ type, payload }: Event): Promise<void> {
    const filePath = resolve(process.cwd(), 'logs/events');
    const fileName = `${FileLogger.getCurrentDate()}.log`;

    FileLogger.createLogFileIfItNotExists(filePath, fileName);

    const log = createSimpleFileLogger(`${filePath}/${fileName}`);

    log.log('info', {
      time: new Date().toISOString(),
      type,
      payload,
    });
  }

  private static createLogFileIfItNotExists(filePath: string, fileName: string) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(`${filePath}/${fileName}`, `log for date ${new Date().toLocaleDateString()}\n`);
    }
  }

  private static getCurrentDate(): string {
    return new Date().toLocaleDateString('id').replace(/[/\\*]/g, '-');
  }
}

export default FileLogger;
