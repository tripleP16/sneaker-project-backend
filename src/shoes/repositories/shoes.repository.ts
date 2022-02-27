import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Shoe from '../models/shoe.entity';
import { Model } from 'mongoose';
import SaveShoeDto from '../dto/save.shoe.dto';

@Injectable()
export class ShoesRepository {
  constructor(@InjectModel(Shoe.name) private shoe: Model<Shoe>) {}

  //Funcion que permite crear un zapato en la base de datos
  async createShoe(shoe: SaveShoeDto): Promise<Shoe> {
    try {
      const shoeToSave = new this.shoe(shoe);
      return await shoeToSave.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
  //Funcion que busca un zapato por el id y lo retorna
  async findShoeById(id: string): Promise<Shoe> {
    return await this.shoe.findById({ _id: id });
  }
}
