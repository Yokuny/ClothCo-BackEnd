import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutsService {
  getOrders(): string {
    return 'All orders';
  }

  getOneOrder(): string {
    return 'Order';
  }

  createOrder(): string {
    return 'Created order';
  }
}
