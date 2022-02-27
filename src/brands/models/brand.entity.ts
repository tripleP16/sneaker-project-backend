import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import Shoe from '../../shoes/models/shoe.entity';
@Schema()
export default class Brand extends Document {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  category: string;
  @Prop()
  shoes: Shoe[];
}
export const BrandSchema = SchemaFactory.createForClass(Brand);
