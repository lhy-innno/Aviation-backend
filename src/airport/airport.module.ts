import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirportEntity])],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
