import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Shoe from '../../shoes/models/shoe.entity';

@Schema()
export default class Store extends Document {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  rating: number;
  @Prop()
  shoes: Shoe[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
