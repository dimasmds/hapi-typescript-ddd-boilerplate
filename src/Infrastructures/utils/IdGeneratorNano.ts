import { nanoid } from 'nanoid';
import { IdGenerator } from '@Domains/commons/utils';

class IdGeneratorNano implements IdGenerator {
  async generate(prefix: string): Promise<string> {
    return `${prefix}${nanoid(16)}`;
  }
}

export default IdGeneratorNano;
