import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandRepository } from '../../brands/repositories/brand.repository';
import uuidDto from 'src/shared/uuid.dto';
import registerShoeDto from '../dto/register.shoe.dto';
import { ShoesRepository } from '../repositories/shoes.repository';
import SaveShoeDto from '../dto/save.shoe.dto';
import UuidGenerator from '../../shared/id.generator';

@Injectable()
export class ShoesService {
  constructor(
    private readonly shoesRepository: ShoesRepository,
    private readonly brandRepository: BrandRepository,
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
}
