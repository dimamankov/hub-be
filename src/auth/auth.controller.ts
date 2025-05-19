import {
  Controller,
  Post,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { Types } from 'mongoose';

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

      const user = await this.authService.signUp({ email, password });
      const data = {
        userId: user._id.toString(),
        email: user.email,
      };
      console.log(data);
      return (await this.attachJwtCookie(data, res))
        .status(200)
        .json({ message: 'User successfully created' });
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Post('signin')
  signin(userData: { email: string; password: string }) {
    return this.authService.signin(userData);
  }
}
