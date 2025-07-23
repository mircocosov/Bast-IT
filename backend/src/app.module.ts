import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseModule } from './house/house.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'zxcvasdqw1',
        database: 'Houses',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    HouseModule,
  ],
})
export class AppModule {}
