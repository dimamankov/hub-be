import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signUp(user: { email: string; password: string }) {
    return this.usersService.createOne(user);
  }
  async signin(user: { email: string; password: string }) {
    return this.usersService.createOne(user);
  }
  async login(user: { email: string; userId: string }) {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
