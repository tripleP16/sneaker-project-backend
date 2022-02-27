import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Admin from '../models/admin.entity';
import { Model } from 'mongoose';
import SaveAdmin from '../dto/save.admin.dto';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AdminRepository {
  constructor(@InjectModel(Admin.name) private admin: Model<Admin>) {}

  // Funcion que permite creatr un admin dentro de la base de datos
  async createAdmin(admin: SaveAdmin): Promise<Admin> {
    try {
      const adminToSave = new this.admin(admin);
      return await adminToSave.save();
    } catch (e) {
      if (e.message.indexOf('1100') != -1) {
        throw new ConflictException('Este email esta en uso'); // Si encontramos el mismo email en la bd arroja 409
      }
      throw new InternalServerErrorException();
    }
  }

  //Funcion que busca un admin por el email y lo retorna

  async findAdminByEmail(email: string): Promise<Admin> {
    const adminToFind = await this.admin.findOne({ email: email });
    if (!adminToFind) {
      throw new NotFoundException('Oops parece que no tenemos ese registro');
    }
    return adminToFind;
  }

  //Funcion que busca un admin por el Id y lo retorna
  async findAdminById(userId: string): Promise<Admin> {
    return await this.admin.findById({ _id: userId });
  }
}
