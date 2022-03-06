import { Injectable, NotFoundException } from '@nestjs/common';
import UuidGenerator from 'src/shared/id.generator';
import uuidDto from '../../shared/uuid.dto';
import { ShoesRepository } from '../../shoes/repositories/shoes.repository';
import { RegisterStoreDto } from '../dto/register.store.dto';
import SaveStoreDto from '../dto/save.store.dto';
import Store from '../models/store.entity';
import StoreRepository from '../repositories/store.repository';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly shoeRepository: ShoesRepository,
  ) {}
  async createStore(store: RegisterStoreDto): Promise<SaveStoreDto> {
    const storeToSave: SaveStoreDto = {
      _id: UuidGenerator.generateUuid(),
      name: store.name,
      rating: store.rating,
    };
    await this.storeRepository.createStore(storeToSave);
    return storeToSave;
  }
  async addShoeToStore(id: uuidDto, shoe_id: uuidDto): Promise<Store> {
    const shoe = await this.shoeRepository.findShoeById(shoe_id.id);
    if (!shoe) {
      throw new NotFoundException('El zapato no se encuentra registrado');
    }
    return await this.storeRepository.addShoeToStore(shoe, id.id);
  }

  async getStores(): Promise<SaveStoreDto[]> {
    const stores = await this.storeRepository.findStores();
    const storesToReturn: SaveStoreDto[] = stores.map((store) => {
      const aux: SaveStoreDto = {
        _id: store._id,
        name: store.name,
        rating: store.rating,
      };
      return aux;
    });
    return storesToReturn;
  }
}
