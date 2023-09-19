import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class AuthBody {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}

export type AuthDocument = HydratedDocument<AuthBody>;

export const AuthSchema = SchemaFactory.createForClass(AuthBody);
