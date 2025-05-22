import { Injectable } from '@nestjs/common';

import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { UtilitiesRepository } from './utilities.repository';

@Injectable()
export class UtilitiesService {
  constructor(private readonly utilitiesRepository: UtilitiesRepository) {}

  create(createUtilityDto: CreateUtilityDto, userId: string) {
    return this.utilitiesRepository.create(createUtilityDto, userId );
  }

  findAll(userId: string, page = 1, limit = 10) {
    return this.utilitiesRepository.findAll(userId, page, limit);
  }

  findOne(id: string) {
    return this.utilitiesRepository.findById(id);
  }

  update(id: string, updateUtilityDto: UpdateUtilityDto) {
    return this.utilitiesRepository.update(id, updateUtilityDto);
  }

  remove(id: string) {
    return this.utilitiesRepository.remove(id);
  }
}
