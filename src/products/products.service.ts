import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private repository: Model<Product>) {}

  async getProducts() {
    return await this.repository.find().exec();
  }

  getProduct(id: string): string {
    return id;
  }
}
