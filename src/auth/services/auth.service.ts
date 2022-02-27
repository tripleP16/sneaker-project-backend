import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import LoginDto from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../dto/jwt.payload';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  // Funcion que valida la existencia del admin en la bd
  async validateAdmin(admin: LoginDto): Promise<any> {
    const adminToFind = await this.adminRepository.findAdminByEmail(
      admin.email,
    );
    if (
      adminToFind &&
      this.checkPassword(adminToFind.password, admin.password)
    ) {
      return adminToFind._id;
    }
    return null;
  }

  // Funcion que retorna el token de autenticacion del admin
  async loginAdmin(admin: LoginDto): Promise<string> {
    const adminId = await this.validateAdmin(admin);
    if (adminId) {
      const payload: JwtPayload = { userId: adminId };
      const accessToken = await this.jwtService.sign(payload);
      return accessToken;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  //Funcion que valida la existencia del usuario en la bd
  async validateUser(user: LoginDto): Promise<any> {
    const userToFind = await this.userRepository.findUserByEmail(user.email);
    if (userToFind && this.checkPassword(userToFind.password, user.password)) {
      return userToFind._id;
    }
    return null;
  }

  //Funcion que retorna el token de acceso del usuario
  async loginUser(user: LoginDto): Promise<string> {
    const userId = await this.validateUser(user);
    if (userId) {
      const payload: JwtPayload = {
        userId: userId,
      };
      const accessToken = await this.jwtService.sign(payload);
      return accessToken;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
  // Funcion que verifica que las contrasenas sean correctas
  async checkPassword(
    userPassword: string,
    loginPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(loginPassword, userPassword);
  }
}
