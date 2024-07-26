import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class GetSponsorsByFullNameSubstringDto {
  @IsString()
  @IsNotEmpty()
  substring: string;
}

export class GetSponsorsByUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
