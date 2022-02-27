import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxDate,
  MinLength,
} from 'class-validator';

export default class RegisterShoeDto {
  @ApiProperty({
    description: 'Modelo del zapato',
    minimum: 4,
    example: 'ADIDAS STAN SMITH',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  model: string;
  @ApiProperty({
    description: 'Precio del zapato',
    example: '100.6',
  })
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Url de la imagen al zapato',
    example:
      'https://concepto.de/wp-content/uploads/2018/10/URL1-e1538664726127.jpg',
  })
  @IsUrl()
  image: string;
  @ApiProperty({
    description: 'Fecha de lanzamiento de los zapatos',
    example: '2000-09-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(new Date())
  releaseDate: Date;
}
