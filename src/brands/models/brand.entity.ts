import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export default class Brand extends Document {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  category: string;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);
