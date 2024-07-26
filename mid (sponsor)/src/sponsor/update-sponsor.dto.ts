import { IsString, IsOptional } from 'class-validator';

export class UpdateSponsorDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
