import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}

export const UserSchema = SchemaFactory.createForClass(User);
