import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async getProfileById(id: string) {
    return this.profilesRepository.getProfileById(id);
  }
}
