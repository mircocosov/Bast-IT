import { Controller, Get } from '@nestjs/common';
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
} 