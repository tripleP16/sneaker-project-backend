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
  async getBrands(): Promise<SaveBrandDto[]> {
    const brands = await this.brandRepository.getBrands();
    const brandsToReturn: SaveBrandDto[] = brands.map((brand) => {
      const brandToReturn: SaveBrandDto = {
        name: brand.name,
        category: brand.category,
        _id: brand._id,
      };
      return brandToReturn;
    });
    return brandsToReturn;
  }
}
