import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
  ) {}

  async getHouse(): Promise<House | null> {
    return this.houseRepository.findOne({ where: {} });
  }

  async findAll(): Promise<House[]> {
    return this.houseRepository.find();
  }

  async findOneById(id: number): Promise<House | null> {
    return this.houseRepository.findOne({ where: { id } });
  }
} 