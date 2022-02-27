import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Category } from '../common/categories.enum';

export default class RegisterBrandDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    description: 'Nombre de la marca',
    minimum: 2,
    example: 'Nike',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}
