import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export default class UuidDto {
  @ApiProperty({
    description: 'Uuid del recurso ',
    example: '4c8d482c-2eb2-499e-85d2-390450c80756',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
