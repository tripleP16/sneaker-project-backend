import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class PasswordHasher {
  //Hash de la contraseña usando bycript
  async hashPassword(password: string): Promise<string> {
    const salt = 15;
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
