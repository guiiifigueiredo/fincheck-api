import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
