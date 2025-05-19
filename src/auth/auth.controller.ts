import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Req() req: Request) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.authService.signUp({ email, password });
      const data = {
        userId: user._id.toString(),
        email: user.email,
      };

      const token = await this.authService.login(data);
      return {
        message: 'User successfully created',
        token,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user account');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Req() req: RequestWithUser) {
    const { token, userId } = await this.authService.login(req.user);
    return {
      token,
      userId,
    };
  }

  @Post('logout')
  async logout() {
    return {
      message: 'Logged out successfully',
    };
  }
}
