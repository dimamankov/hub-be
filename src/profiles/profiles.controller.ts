import { Controller } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  //   constructor(private profilesService: ProfileService) {}
  //   @Get(':id')
  //   async getProfile(@Param('id') id: string): Promise<any> {
  //     const user = await this.profilesService.getProfileById(id);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return null;
  //   }
}
