import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export default class Shoe extends Document {
  @Prop()
  _id: string;
  @Prop()
  model: string;
  @Prop()
  image: string;
  @Prop()
  price: number;
  @Prop()
  releaseDate: Date;
}
export const ShoeSchema = SchemaFactory.createForClass(Shoe);
