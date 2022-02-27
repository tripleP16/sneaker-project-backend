import { Injectable } from '@nestjs/common';
import UuidGenerator from 'src/shared/id.generator';
import registerBrandDto from '../dto/register.brand.dto';
import SaveBrandDto from '../dto/save.brand.dto';
import Brand from '../models/brand.entity';
import { BrandRepository } from '../repositories/brand.repository';

@Injectable()
export class BrandsService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async registerBrand(brand: registerBrandDto): Promise<Brand> {
    const brandToSave: SaveBrandDto = {
      name: brand.name,
      category: brand.category,
      _id: UuidGenerator.generateUuid(),
    };
    return await this.brandRepository.createBrand(brandToSave);
  }
}
