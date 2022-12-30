import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightEntity } from './flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FlightEntity])],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
