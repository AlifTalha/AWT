import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}



export class SponsorDto {
  @IsString({ message: "Please enter a valid name" })
  fullname: string;

  @IsNotEmpty({ message: "Id must be number" })
  id: number;

  @IsString({ message: "Password must be string" })
  password: string;

  @IsEmail({})
  username: string;
  name: string;
}



export class CoorDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Name field should not contain any numbers' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[@#$&]/, { message: 'Password must contain one of the special characters (@, #, $, &)' })
  password: string;

  @IsDateString({}, { message: 'Date must be a valid date type' })
  date: Date;

  @IsUrl({}, { message: 'Social media link must be a valid URL' })
  socialMediaLink: string;
}

export class loginDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string; 
}

export class SponsorUpdateDto {
  @IsEmail()
  'username': string;
  'address': string;
}

// export class RegisterSponsorDto {
//   @IsNotEmpty()
//   fullname: string;

//   @IsNotEmpty()
//   username: string;

//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   phonenumber: string;

//   @IsNotEmpty()
//   @IsEnum(['male', 'female', 'other'])
//   gender: string;
  
//   @IsString()
//   password: string;
  
// }

export class RegisterSponsorDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
 
  password: string;
}