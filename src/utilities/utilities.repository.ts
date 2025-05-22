import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { Utility } from './models/utility.model';

@Injectable()
export class UtilitiesRepository {
  constructor(
    @InjectModel(Utility.name) private utilityModel: Model<Utility>
  ) {}

  async create(createUtilityDto: CreateUtilityDto): Promise<Utility> {
    try {
      const createdUtility = await this.utilityModel.create(createUtilityDto);
      return createdUtility;
    } catch (error) {
      throw new Error(`Failed to create utility: ${error.message}`);
    }
  }

  async findAll(
    userId: string,
    page = 1,
    limit = 10
  ): Promise<{ data: Utility[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.utilityModel.find({ userId }).skip(skip).limit(limit).exec(),
        this.utilityModel.countDocuments({ userId }).exec(),
      ]);
      return { data, total };
    } catch (error) {
      throw new Error(`Failed to fetch utilities: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Utility> {
    try {
      const utility = await this.utilityModel.findById(id).exec();
      if (!utility) {
        throw new NotFoundException(`Utility with ID ${id} not found`);
      }
      return utility;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to fetch utility: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateUtilityDto: UpdateUtilityDto
  ): Promise<Utility> {
    try {
      const updatedUtility = await this.utilityModel
        .findByIdAndUpdate(id, updateUtilityDto, { new: true })
        .exec();

      if (!updatedUtility) {
        throw new NotFoundException(`Utility with ID ${id} not found`);
      }

      return updatedUtility;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to update utility: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Utility> {
    try {
      const deletedUtility = await this.utilityModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedUtility) {
        throw new NotFoundException(`Utility with ID ${id} not found`);
      }
      return deletedUtility;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Failed to delete utility: ${error.message}`);
    }
  }
}
