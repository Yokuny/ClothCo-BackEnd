import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { NewAuthBodyDto } from './dto/userBody.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  private userByEmail(email: string) {
    return this.repository.userByEmail(email);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) return null;

    return user;
  }

  async signIn(user) {
    const payload = { email: user.email, sub: user.id };
    console.log('user de signin payload');
    console.log(user);
    console.log('user de signin payload');
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async signUp(user: NewAuthBodyDto) {
    const { name, email, password } = user;

    const emailFound = await this.userByEmail(email);
    if (emailFound) throw new ConflictException('Email already exists');

    const cryptPassword = await bcrypt.hash(`${password}`, 10);
    const newUser = {
      name,
      email,
      password: cryptPassword,
    };

    await this.repository.createUser(newUser);
  }
}
