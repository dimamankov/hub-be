import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      userId: user._id,
      email: user.email,
    };
  }

  async signUp(user: { email: string; password: string }) {
    const hashedPassword = await this.hashPassword(user.password);

    return this.usersService.createOne({
      ...user,
      password: hashedPassword,
    });
  }

  async login(user: { email: string; userId: string }) {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
