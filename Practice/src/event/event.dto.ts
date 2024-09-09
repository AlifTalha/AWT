import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
  phoneNumber: string;
}
