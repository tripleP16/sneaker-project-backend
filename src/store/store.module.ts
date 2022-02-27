import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Shoe, { ShoeSchema } from 'src/shoes/models/shoe.entity';
import { ShoesRepository } from 'src/shoes/repositories/shoes.repository';
import { StoreController } from './controllers/store.controller';
import Store, { StoreSchema } from './models/store.entity';
import StoreRepository from './repositories/store.repository';
import { StoreService } from './services/store.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Shoe.name,
        schema: ShoeSchema,
      },
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository, ShoesRepository],
})
export class StoreModule {}
