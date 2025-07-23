import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { HouseService } from './house.service';
import { House } from './house.entity';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  async findAll(): Promise<House[]> {
    if (typeof this.houseService['findAll'] !== 'function') {
      throw new Error('findAll method not implemented in HouseService');
    }
    return await this.houseService['findAll']();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<House> {
    if (typeof this.houseService['findOneById'] !== 'function') {
      throw new Error('findOneById method not implemented in HouseService');
    }
    const house = await this.houseService['findOneById'](Number(id));
    if (!house) {
      throw new NotFoundException('House not found');
    }
    return house;
  }
} 