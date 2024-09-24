import { IsNotEmpty } from 'class-validator';
import { loginDto } from 'src/sponsor/sponsor.dto';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
