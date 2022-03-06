import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Brand, { BrandSchema } from 'src/brands/models/brand.entity';
import { BrandRepository } from 'src/brands/repositories/brand.repository';
import Store, { StoreSchema } from 'src/store/models/store.entity';
import StoreRepository from 'src/store/repositories/store.repository';
import { ShoesController } from './controllers/shoes.controller';
import Shoe, { ShoeSchema } from './models/shoe.entity';
import { ShoesRepository } from './repositories/shoes.repository';
import { ShoesService } from './services/shoes.service';

@Module({
  providers: [ShoesService, ShoesRepository, BrandRepository, StoreRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Shoe.name,
        schema: ShoeSchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
  ],
  controllers: [ShoesController],
})
export class ShoesModule {}
