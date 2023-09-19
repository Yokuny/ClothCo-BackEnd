import * as mongoose from 'mongoose';

type Product = {
  title: string;
  quantity: number;
  price: number;
};

export const OrderSchema = new mongoose.Schema({
  products: [] as Product[],
  total: Number,
  userId: String,
});
