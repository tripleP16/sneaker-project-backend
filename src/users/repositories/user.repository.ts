import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  //Funcion que busca un usuario por el email y lo retorna
  async findUserByEmail(email: string): Promise<User> {
    const userToFind = await this.userModel.findOne({ email: email });
    if (!userToFind) {
      throw new NotFoundException('Oops parece que no tenemos ese registro');
    }
    return userToFind;
  }

  //Funcion que busca un usuario por id y lo retorna
  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById({ _id: id });
  }
}
