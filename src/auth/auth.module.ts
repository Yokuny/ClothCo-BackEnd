import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSchema, AuthBody } from './schemas/auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: AuthBody.name, schema: AuthSchema }]),
    JwtModule.register({
      global: true,
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, jwtStrategy],
})
export class AuthModule {}
