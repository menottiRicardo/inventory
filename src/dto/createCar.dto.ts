import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}
