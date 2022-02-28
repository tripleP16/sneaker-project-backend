import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Shoe from '../../shoes/models/shoe.entity';
@Schema()
export default class User extends Document {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  lastname: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  birthday: Date;
  @Prop()
  favorites: Shoe[];
}

export const UserSchema = SchemaFactory.createForClass(User);
