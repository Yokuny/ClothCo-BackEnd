import { Mongoose } from 'mongoose';
import { ProductSchema } from './schemas/products.schema';

export const productsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Product', ProductSchema),
    inject: [Mongoose],
  },
];
