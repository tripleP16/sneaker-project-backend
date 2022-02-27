import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import Admin, { AdminSchema } from 'src/admin/models/admin.entity';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/users/repositories/user.repository';
import User, { UserSchema } from 'src/users/models/user.entity';
import { JwtStrategyUser } from './strategies/jwt.user.strategy';

@Module({
  exports: [JwtStrategy, PassportModule, JwtStrategyUser],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminRepository,
    JwtStrategy,
    UserRepository,
    JwtStrategyUser,
  ],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
})
export class AuthModule {}
