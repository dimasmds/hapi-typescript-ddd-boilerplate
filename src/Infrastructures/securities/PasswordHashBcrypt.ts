import { hash, compare } from 'bcrypt';
import { PasswordHash } from '@Domains/users/securities';

class PasswordHashBcrypt implements PasswordHash {
  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  compare(hashed: string, plain: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}

export default PasswordHashBcrypt;
