import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin.dto';
import { SignupUserDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;
    const userAuthenticate = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!userAuthenticate) {
      throw new UnauthorizedException('Invalid Crendencials!!');
    }

    const isPasswordValid = await compare(password, userAuthenticate.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário sem permissão');
    }

    const accessToken =  await this.generateAcessToken(userAuthenticate.id);

    return {
      accessToken,
    };
  }

  async signup(signUserDto: SignupUserDto) {
    const { name, password, email } = signUserDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('this email is already in use!!!');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAcessToken(user.id);

    return {
      accessToken,
    };
  }

  private generateAcessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
