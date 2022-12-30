import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flight')
export class FlightEntity {
  @PrimaryGeneratedColumn()
  flight_id: number; // 标记为主列，值自动生成

  @Column('int')
  departure_airport_airport_id: number;

  @Column('int')
  destination_airport_airport_id: number;

  @Column('bigint')
  aircraft_aircraft_id: number;

  @Column('bigint')
  flight_number: number;

  @Column('double')
  flight_charge: number;

  @Column({ type: 'date' })
  arrival_date: Date;

  @Column({ length: 50 })
  arrival_time: string;

  @Column({ type: 'date' })
  departure_date: Date;

  @Column({ length: 50 })
  departure_time: string;
}
