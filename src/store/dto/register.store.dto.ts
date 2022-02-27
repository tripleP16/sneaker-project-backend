import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class RegisterStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
