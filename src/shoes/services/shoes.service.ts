import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../../brands/repositories/brand.repository';
import uuidDto from 'src/shared/uuid.dto';
import registerShoeDto from '../dto/register.shoe.dto';
import { ShoesRepository } from '../repositories/shoes.repository';
import SaveShoeDto from '../dto/save.shoe.dto';
import UuidGenerator from '../../shared/id.generator';
import Shoe from '../models/shoe.entity';
import { FindShoesDto } from '../dto/find.shoe.dto';
import StoreRepository from 'src/store/repositories/store.repository';

@Injectable()
export class ShoesService {
  constructor(
    private readonly shoesRepository: ShoesRepository,
    private readonly brandRepository: BrandRepository,
    private readonly storeRepository: StoreRepository,
  ) {}
  async createShoe(
    shoe: registerShoeDto,
    brandId: uuidDto,
  ): Promise<SaveShoeDto> {
    const brand = await this.brandRepository.FindBrandById(brandId.id);
    if (!brand) {
      throw new NotFoundException('No existe esa marca en nuestros registros');
    }
    const shoeToSave: SaveShoeDto = {
      _id: UuidGenerator.generateUuid(),
      model: shoe.model,
      price: shoe.price,
      image: shoe.image,
      releaseDate: shoe.releaseDate,
    };
    const newShoe = await this.shoesRepository.createShoe(shoeToSave);
    await this.brandRepository.addShoe(newShoe, brandId.id);
    return shoeToSave;
  }

  async getShoes(filter: FindShoesDto): Promise<Shoe[]> {
    if (!filter.brandId && !filter.storeId) {
      return await this.shoesRepository.findShoes();
    }
    if (!filter.storeId && filter.brandId) {
      const brand = await this.brandRepository.FindBrandById(filter.brandId);
      return brand.shoes;
    }
    if (!filter.brandId && filter.storeId) {
      const store = await this.storeRepository.findStoreById(filter.storeId);
      return store.shoes;
    }
    if (filter.brandId && filter.storeId) {
      const brand = await this.brandRepository.FindBrandById(filter.brandId);
      const store = await this.storeRepository.findStoreById(filter.storeId);
      const shoes = brand.shoes.concat(store.shoes);
      const foo = new Map();
      for (const shoe of shoes) {
        foo.set(shoe._id, shoe);
      }
      const final = [...foo.values()];
      return final;
    }
  }
}
