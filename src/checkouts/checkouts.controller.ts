import { Controller, Get, Post } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';

@Controller('checkout')
export class CheckoutsController {
  constructor(private readonly service: CheckoutsService) {}

  @Get()
  getOrders(): string {
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
