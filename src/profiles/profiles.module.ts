import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Profile } from './models/profile.model';
import { ProfileSchema } from './models/profile.model';
import { ProfileService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { ProfilesController } from './profiles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService, ProfilesRepository],
  controllers: [ProfilesController],
  exports: [ProfileService],
})
export class ProfilesModule {}
