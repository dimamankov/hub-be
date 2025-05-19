import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Profile, ProfileModel } from './models/profile.model';

@Injectable()
export class ProfilesRepository {
  constructor(@InjectModel(Profile.name) private profileModel: ProfileModel) {}

  getProfileById(id: string) {
    return this.profileModel.findById(id).exec();
  }
}
