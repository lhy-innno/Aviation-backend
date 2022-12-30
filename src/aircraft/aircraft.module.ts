import { Module } from '@nestjs/common';
import { AircraftController } from './aircraft.controller';
import { AircraftService } from './aircraft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftEntity } from './aircraft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AircraftEntity])],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule {}
