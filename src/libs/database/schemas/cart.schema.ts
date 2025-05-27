import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Grocery, GrocerySchema } from './grocery.schema';

export type Cartocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: [GrocerySchema] })
  items: Grocery[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
