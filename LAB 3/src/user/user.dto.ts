import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 150)
  fullName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class GetUsersByFullNameSubstringDto {
  @IsString()
  substring: string;
}
