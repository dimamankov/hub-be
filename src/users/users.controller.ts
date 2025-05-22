import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserWithProfileDto } from './dto/user-with-profile.dto';
import { ProfileService } from 'src/profiles/profiles.service';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private profilesService: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserWithProfileDto> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const profile = await this.profilesService.getProfileById(id);
    console.log(profile);
    return {
      email: user.email,
      profile: profile
        ? {
            name: profile.name,
            lastName: profile.lastName,
            phone: profile.phone,
            role: profile.role as 'agency' | 'landlord' | 'tenant',
          }
        : {
            name: '',
            lastName: '',
            phone: '',
            role: null,
          },
    };
  }
}
