import { Injectable } from '@nestjs/common';
import UuidGenerator from 'src/shared/id.generator';
import PasswordHasher from 'src/shared/password.hash';
import registerAdminDto from '../dto/register.admin.dto';
import ReturnAdminDto from '../dto/return.admin.dto';
import SaveAdmin from '../dto/save.admin.dto';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly hasher: PasswordHasher,
  ) {}
  async createAdmin(admin: registerAdminDto): Promise<ReturnAdminDto> {
    const adminToSend: SaveAdmin = {
      _id: UuidGenerator.generateUuid(),
      password: await this.hasher.hashPassword(admin.password),
      email: admin.email,
    };
    const newAdmin = await this.adminRepository.createAdmin(adminToSend);
    const adminToReturn: ReturnAdminDto = {
      _id: newAdmin._id,
      email: newAdmin.email,
    };
    return adminToReturn;
  }
}
