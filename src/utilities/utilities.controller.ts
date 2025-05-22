import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { UtilitiesService } from './utilities.service';

@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post()
  create(@Body() createUtilityDto: CreateUtilityDto) {
    return this.utilitiesService.create(createUtilityDto);
  }

  @Get()
  findAll(
    @Query('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.utilitiesService.findAll(userId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilityDto: UpdateUtilityDto) {
    return this.utilitiesService.update(id, updateUtilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilitiesService.remove(id);
  }
}
