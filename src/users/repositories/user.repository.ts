import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import User from '../models/user.entity';
import { Model } from 'mongoose';
import SaveUserDto from '../dto/save.user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Funcion dentro del repositorio que permite crear un usuario
  async createUser(user: SaveUserDto): Promise<User> {
    try {
      const userToSave = new this.userModel(user);
      return await userToSave.save();
    } catch (e) {
      if (e.message.indexOf('1100') != -1) {
        throw new ConflictException('Este email esta en uso'); // Si encontramos el mismo email en la bd arroja 409
      }
      throw new InternalServerErrorException();
    }
  }
}
