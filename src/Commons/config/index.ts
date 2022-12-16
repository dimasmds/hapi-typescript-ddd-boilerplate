/* istanbul ignore file */
import { config } from 'dotenv';
import { resolve } from 'path';

if (process.env.NODE_ENV === 'test') {
  config({ path: resolve(__dirname, '../../../.test.env') });
} else {
  config();
}

export default {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
};
