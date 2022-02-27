import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RegisterAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email del admin',
    example: 'perez@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'Contraseña del admin',
    minimum: 8,
  })
  password: string;
}
