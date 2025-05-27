import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './constants';

export class CommonHelpers {
  async generatePasswordHash(plainPassword: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(plainPassword, salt);
  }

  async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  validatePassword(receivedPassword: string, password: string) {
    if (receivedPassword === password) {
      return true;
    }
    return false;
  }
}
