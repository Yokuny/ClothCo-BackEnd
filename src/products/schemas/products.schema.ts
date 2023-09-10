import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  img: string;

  @Prop()
  imgb: string;

  @Prop()
  color: string;

  @Prop()
  type: string;

  @Prop([String])
  description: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
