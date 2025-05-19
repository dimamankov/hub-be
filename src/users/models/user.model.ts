import { SchemaFactory, Schema } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;

export type UserDocument = HydratedDocument<User>;
