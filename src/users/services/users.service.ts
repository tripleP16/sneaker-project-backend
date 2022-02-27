import { Injectable } from '@nestjs/common';
import registerUserDto from '../dto/register.user.dto';
import ReturnUser from '../dto/return.user.dto';
import { UserRepository } from '../repositories/user.repository';
import SaveUserDto from '../dto/save.user.dto';
import UuidGenerator from '../../shared/id.generator';
import PasswordHasher from 'src/shared/password.hash';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}
  //Metodo para registrar usuarios
  async registerUser(user: registerUserDto): Promise<ReturnUser> {
    const userToSave: SaveUserDto = {
      _id: UuidGenerator.generateUuid(),
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: await this.hasher.hashPassword(user.password),
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
