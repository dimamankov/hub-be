import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  signup() {
    return 'I have signed up';
  }
  async signin(userData: { email: string; password: string }) {
    return this.usersService.createOne(userData);
  }
}
