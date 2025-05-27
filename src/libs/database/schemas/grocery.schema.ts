import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroceryDocument = HydratedDocument<Grocery>;

@Schema()
export class Grocery {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ default: 1 })
  quantity: number;
}

export const GrocerySchema = SchemaFactory.createForClass(Grocery);
