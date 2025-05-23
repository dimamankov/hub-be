import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { UtilitiesTypes } from 'src/emuns/utilitiesTypes.enum';

@Schema({
  timestamps: true,
})
export class Utility {
  @Prop({ required: true, enum: UtilitiesTypes })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  startPeriod: Date;

  @Prop({ required: false })
  endPeriod: Date;

  @Prop({ required: false })
  dateToPay: Date;

  @Prop({ required: false })
  paidDate: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  status: string;

  @Prop({ required: false })
  comments: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;

  @Prop({ required: false })
  whoPaid: string;

  @Prop({ required: false })
  isDebt: boolean;

  @Prop({ required: false })
  receiptPhotoUrl: File;

  @Prop({ required: false })
  paymentSlipPhotoUrl: File;
}

export const UtilitySchema = SchemaFactory.createForClass(Utility);
UtilitySchema.index({ userId: 1 });
UtilitySchema.index({ startPeriod: 1, endPeriod: 1 });

UtilitySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export type UtilityModel = Model<Utility>;

export type UtilityDocument = HydratedDocument<Utility>;
