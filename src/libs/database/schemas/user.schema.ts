import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Cart } from './cart.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  passwordHash: string;

  @Prop({ type: Types.ObjectId, ref: 'carts' })
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
