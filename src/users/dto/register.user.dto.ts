import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxDate,
  MinDate,
  MinLength,
} from 'class-validator';

// Dto para el registro de usuarios
export default class RegisterUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    minimum: 4,
    example: 'Pablo',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;
  @ApiProperty({
    description: 'Apellido del usuario',
    minimum: 4,
    example: 'Perez',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  lastname: string;
  @ApiProperty({
    description: 'Email del usuario',
    example: 'perez@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Contraseña del usuario',
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '2000-09-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthday: Date;
}
