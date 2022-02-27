import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PasswordHasher from '../shared/password.hash';
import { AdminController } from './controllers/admin.controller';
import Admin, { AdminSchema } from './models/admin.entity';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './services/admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PasswordHasher],
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
})
export class AdminModule {}
