import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Shoe, { ShoeSchema } from '../shoes/models/shoe.entity';
import PasswordHasher from '../shared/password.hash';
import { UsersController } from './controllers/users.controller';
import User, { UserSchema } from './models/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { ShoesRepository } from '../shoes/repositories/shoes.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PasswordHasher, ShoesRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Shoe.name,
        schema: ShoeSchema,
      },
    ]),
  ],
})
export class UsersModule {}
