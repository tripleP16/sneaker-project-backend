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
import Shoe from '../../shoes/models/shoe.entity';

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
  //Funcion que permite añadir un zapato a la lista de favoritos
  async addShoeToFavorites(id: string, shoe: Shoe): Promise<User> {
    const user = await this.findUserById(id);
    if (!this.validateShoe(shoe, user.favorites)) {
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $push: { favorites: shoe } },
      );
    }
    throw new ConflictException('Ese zapato ya esta en la lista de favoritos');
  }

  validateShoe(shoe: Shoe, favorites: Shoe[]): boolean {
    const findShoe = favorites.filter((element) => element._id === shoe._id);
    if (findShoe.length >= 1) {
      return true;
    }
    return false;
  }

  async deleteShoeFromList(id: string, shoe: Shoe): Promise<User> {
    const user = await this.findUserById(id);
    if (this.validateShoe(shoe, user.favorites)) {
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $pull: { favorites: { _id: shoe._id } } },
      );
    }
    throw new ConflictException('Ese zapato no esta en la lista de favoritos');
  }
}
