import { Injectable } from '@nestjs/common';
import registerUserDto from '../dto/register.user.dto';
import ReturnUser from '../dto/return.user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import SaveUserDto from '../dto/save.user.dto';
import UuidGenerator from '../../shared/id.generator';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  //Hash de la contraseña usando bycript
  async hashPassword(password: string): Promise<string> {
    const salt = 15;
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  //Metodo para registrar usuarios
  async registerUser(user: registerUserDto): Promise<ReturnUser> {
    const userToSave: SaveUserDto = {
      _id: UuidGenerator.generateUuid(),
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: await this.hashPassword(user.password),
      birthday: user.birthday,
    };
    const newUser = await this.userRepository.createUser(userToSave);
    const userToReturn: ReturnUser = {
      _id: newUser._id,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      birthday: newUser.birthday,
    };
    return userToReturn;
  }
}
