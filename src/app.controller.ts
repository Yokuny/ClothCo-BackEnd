import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get hello world',
  })
  @ApiResponse({
    status: 200,
    description: 'Hello world',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: 'Get health',
  })
  @ApiResponse({
    status: 200,
    description: "I'm alive!",
  })
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
