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

@Module({
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AdminRepository, JwtStrategy],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
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
