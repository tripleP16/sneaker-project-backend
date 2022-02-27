import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ReturnAdminDto from 'src/admin/dto/return.admin.dto';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import { JwtPayload } from '../dto/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private adminRepository: AdminRepository,
    private config: ConfigService,
  ) {
    super({
      secretOrKey: config.get('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<ReturnAdminDto> {
    const { userId } = payload;
    const admin = await this.adminRepository.findAdminById(userId);
    if (!admin) {
      throw new UnauthorizedException();
    }
    const adminToReturn: ReturnAdminDto = {
      _id: admin._id,
      email: admin.email,
    };
    return adminToReturn;
  }
}
