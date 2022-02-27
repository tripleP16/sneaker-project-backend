import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ReturnUser from 'src/users/dto/return.user.dto';
import { UserRepository } from '../../users/repositories/user.repository';
import { JwtPayload } from '../dto/jwt.payload';

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private config: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      secretOrKey: config.get('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<ReturnUser> {
    const { userId } = payload;
    const userFound = await this.userRepository.findUserById(userId);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    const user: ReturnUser = {
      _id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      lastname: userFound.lastname,
      birthday: userFound.birthday,
    };
    return user;
  }
}
