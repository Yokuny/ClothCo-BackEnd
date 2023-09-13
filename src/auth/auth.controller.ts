import {
  Body,
  Post,
  Res,
  Controller,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthBodyDto, NewAuthBodyDto } from './dto/userBody.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({
    summary: 'Sign in with email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'User can sign in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBody({
    type: AuthBodyDto,
  })
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Body() body: AuthBodyDto, @Res() res: Response) {
    try {
      const token = await this.service.signIn(body);
      return res.status(HttpStatus.OK).json(token);
    } catch (err) {
      if (err.status === 401) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: err.message });
      }
      if (err.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  @ApiOperation({
    summary: 'Sign up with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User can sign up',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBody({
    type: NewAuthBodyDto,
  })
  @Post('signup')
  async signUp(@Body() body: NewAuthBodyDto, @Res() res: Response) {
    try {
      await this.service.signUp(body);

      return res.sendStatus(HttpStatus.CREATED);
    } catch (err) {
      if (err.status === 409) {
        return res.status(HttpStatus.CONFLICT).json({ message: err.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  @ApiOperation({
    summary: 'Get user validation',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards()
  @Get('profile')
  async getProfile(@Res() res: Response) {
    try {
      return res.sendStatus(HttpStatus.OK);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
}
