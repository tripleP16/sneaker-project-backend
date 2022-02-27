import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PasswordHasher from '../shared/password.hash';
import { UsersController } from './controllers/users.controller';
import User, { UserSchema } from './models/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PasswordHasher],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UsersModule {}
