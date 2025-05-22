import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UtilitiesTypes } from 'src/emuns/utilitiesTypes.enum';

export class CreateUtilityDto {
  @IsEnum(UtilitiesTypes)
  @IsNotEmpty()
  name: UtilitiesTypes;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startPeriod: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endPeriod: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateToPay?: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  paidDate: Date;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  whoPaid?: string;

  @IsBoolean()
  @IsOptional()
  isDebt?: boolean;

  @IsString()
  @IsOptional()
  receiptPhotoUrl?: string;

  @IsString()
  @IsOptional()
  paymentSlipPhotoUrl?: string;
}
