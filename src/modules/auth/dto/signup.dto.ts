import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class SignupUserDto {
  id: UUID;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
