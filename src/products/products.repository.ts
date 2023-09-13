import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { mongoIdDto } from './dto/mongoId.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private db: Model<Product>) {}

  getProducts(): Promise<Product[]> {
    return this.db.find().exec();
  }

  getProduct(_id: mongoIdDto): Promise<Product> {
    return this.db.findById(_id.id).exec();
  }
}
