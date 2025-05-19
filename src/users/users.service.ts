import { Injectable } from '@nestjs/common';

// import { User } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async createOne(userData: { email: string; password: string }) {
    return this.usersRepository.createUser(userData);
  }

  //   async createGoogleUser(user: { email: string; provider: string }) {
  //     return this.usersRepository.createGoogleUser(user);
  //   }

  //   async updatePassword(id: string, password: string) {
  //     return this.usersRepository.updatePassword(id, password);
  //   }

  //   async updatePasswordByEmail(email: string, password: string) {
  //     return this.usersRepository.updatePasswordByEmail(email, password);
  //   }

  //   async getSettings(userId: string) {
  //     const user = await this.usersRepository.getSettings(userId);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return user;
  //   }

  //   async updateSettings(userId: string, settings: Partial<User['settings']>) {
  //     const user = await this.usersRepository.updateSettings(userId, settings);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return user;
  //   }
}
