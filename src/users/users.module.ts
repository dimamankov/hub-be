import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { User, UserSchema } from './models/user.model';
import { Profile, ProfileSchema } from 'src/profiles/models/profile.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { ProfileService } from 'src/profiles/profiles.service';
import { ProfilesRepository } from 'src/profiles/profiles.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    ProfilesModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    ProfileService,
    ProfilesRepository,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
