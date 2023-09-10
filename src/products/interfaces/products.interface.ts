import { Document } from 'mongoose';

export interface Product extends Document {
  readonly title: string;
  readonly price: number;
  readonly quantity: number;
  readonly img: string;
  readonly imgb: string;
  readonly color: string;
  readonly type: string;
  readonly description: string[];
}
