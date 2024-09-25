import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegisterSponsorDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
