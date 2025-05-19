import {
  Controller,
  Post,
  Res,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

// Add this interface to extend the Express Request type
interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async attachJwtCookie(
    data: { email: string; userId: string },
    res: Response,
  ) {
    const jwt = await this.authService.login(data);

    // Set the JWT as an HttpOnly, Secure, and SameSite cookie
    return res.cookie('jwt', jwt, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Ensure cookie is sent over HTTPS in production
      sameSite: 'strict', // Protect against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d in milliseconds
    });
  }

  @Post('sign-up')
  async signUp(@Req() req: Request, @Res() res: Response) {
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

      return (await this.attachJwtCookie(data, res))
        .status(200)
        .json({ message: 'User successfully created' });
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
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    return (await this.attachJwtCookie(req.user, res))
      .status(200)
      .json({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
      })
      .status(204)
      .json({ message: 'Logged out successfully' });
  }
}
