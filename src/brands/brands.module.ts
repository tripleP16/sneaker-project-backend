import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './controllers/brands.controller';
import Brand, { BrandSchema } from './models/brand.entity';
import { BrandRepository } from './repositories/brand.repository';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService, BrandRepository],
})
export class BrandsModule {}
