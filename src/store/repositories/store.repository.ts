import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Shoe from '../../shoes/models/shoe.entity';
import SaveStoreDto from '../dto/save.store.dto';
import Store from '../models/store.entity';
@Injectable()
export default class StoreRepository {
  constructor(@InjectModel(Store.name) private store: Model<Store>) {}

  // Funcion que permite crear una tienda
  async createStore(store: SaveStoreDto): Promise<Store> {
    try {
      const storeToSave = new this.store(store);
      return await storeToSave.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //Funcion que busca una store y añade el shoe al array
  async addShoeToStore(shoe: Shoe, id: string): Promise<Store> {
    try {
      return await this.store.findByIdAndUpdate(
        { _id: id },
        { $push: { shoes: shoe } },
      );
    } catch (e) {
      throw new NotFoundException('El recurso no ha sido encontrado');
    }
  }
}
