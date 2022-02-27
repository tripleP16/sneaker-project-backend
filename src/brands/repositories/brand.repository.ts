import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Brand from '../models/brand.entity';
import { Model } from 'mongoose';
import SaveBrandDto from '../dto/save.brand.dto';
import Shoe from '../../shoes/models/shoe.entity';

@Injectable()
export class BrandRepository {
  constructor(@InjectModel(Brand.name) private brand: Model<Brand>) {}

  //Metodo que permite crear una marca
  async createBrand(brand: SaveBrandDto): Promise<Brand> {
    try {
      const brandToSave = new this.brand(brand);
      return await brandToSave.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  //Funcion que retorna una marca segun el id
  async FindBrandById(id: string): Promise<Brand> {
    return await this.brand.findById({ _id: id });
  }

  //Funcion que agrega un zapato a una marca
  async addShoe(shoe: Shoe, id: string): Promise<Brand> {
    try {
      return await this.brand.findByIdAndUpdate(
        { _id: id },
        { $push: { shoes: shoe } },
      );
    } catch (e) {
      throw new NotFoundException('El recurso no ha sido encontrado');
    }
  }
}
