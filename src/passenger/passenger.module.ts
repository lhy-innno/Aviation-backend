import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PassengerEntity } from './passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from '../flight/flight.entity';
import { FlightModule } from '../flight/flight.module';
import { FlightService } from '../flight/flight.service';
import { FlightController } from '../flight/flight.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PassengerEntity, FlightEntity]),
    FlightModule,
  ],
  controllers: [PassengerController],
  providers: [PassengerService, FlightService],
})
export class PassengerModule {}
