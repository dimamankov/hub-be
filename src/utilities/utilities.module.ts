import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Utility, UtilitySchema } from './models/utility.model';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesRepository } from './utilities.repository';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Utility.name, schema: UtilitySchema }]),
  ],
  controllers: [UtilitiesController],
  providers: [UtilitiesService, UtilitiesRepository],
  exports: [UtilitiesService],
})
export class UtilitiesModule {}
