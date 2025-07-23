import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './house.entity';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  providers: [HouseService],
  controllers: [HouseController],
})
export class HouseModule {}
