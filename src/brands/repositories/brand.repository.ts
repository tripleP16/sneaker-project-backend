import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Brand from '../models/brand.entity';
import { Model } from 'mongoose';
import SaveBrandDto from '../dto/save.brand.dto';

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
}
