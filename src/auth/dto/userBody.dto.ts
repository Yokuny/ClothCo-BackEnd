import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewAuthBodyDto {
  @ApiProperty({ description: 'User name' })
  @ApiProperty({ example: 'John Doe' })
  @ApiProperty({})
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email' })
  @ApiProperty({ example: 'meu@melhor.email' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password' })
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}

export class AuthBodyDto {
  @ApiProperty({ description: 'User email' })
  @ApiProperty({ example: 'meu@melhor.email' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password' })
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
