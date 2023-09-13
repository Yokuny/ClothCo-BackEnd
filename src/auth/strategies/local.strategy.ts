import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const user = await this.service.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Email or password doesn't match");
    }

    return user;
  }
}
