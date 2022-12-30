import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PassengerEntity } from './passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity])],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
