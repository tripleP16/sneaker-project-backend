import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email del usuario que quiere iniciar sesion',
    example: 'perez@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'Contraseña del usuario que quiere iniciar sesion',
    minimum: 8,
  })
  password: string;
}
