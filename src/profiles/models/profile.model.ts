import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: ['agency', 'landlord', 'tenant'] })
  role: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

export type ProfileModel = Model<Profile>;

export type ProfileDocument = HydratedDocument<Profile>;
