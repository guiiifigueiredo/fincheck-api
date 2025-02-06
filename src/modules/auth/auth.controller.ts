import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin.dto';
import { SignupUserDto } from './dto/signup.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.authService.signin(signinUserDto);
  }

  @IsPublic()
  @Post('signup')
  signup(@Body() signupDto: SignupUserDto) {
    return this.authService.signup(signupDto);
  }
}
