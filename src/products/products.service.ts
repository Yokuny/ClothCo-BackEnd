import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { mongoIdDto } from './dto/mongoId.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  async getProducts() {
    const products = await this.repository.getProducts();
    if (!products) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  async getProduct(id: mongoIdDto) {
    const product = await this.repository.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
