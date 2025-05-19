import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserModel } from './models/user.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  createUser(user: { email: string; password: string }) {
    return this.userModel.create(user);
  }
}
