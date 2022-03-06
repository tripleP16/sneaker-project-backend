import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindShoesDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  storeId?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  brandId?: string;
}
