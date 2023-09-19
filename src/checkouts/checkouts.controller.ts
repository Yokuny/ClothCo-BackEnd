import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckoutsService } from './checkouts.service';

@Controller('checkout')
@UseGuards(AuthGuard('jwt'))
export class CheckoutsController {
  constructor(private readonly service: CheckoutsService) {}

  @Get()
  getOrders(@Req() body: any): string {
    console.log(body.user);
    return this.service.getOrders();
  }

  @Get(':id')
  getOneOrder(): string {
    return this.service.getOneOrder();
  }

  @Post()
  createOrder(): string {
    return this.service.createOrder();
  }
}
