import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aircraft')
export class AircraftEntity {
  @PrimaryGeneratedColumn()
  aircraft_id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  manufacturer: string;

  @Column({ length: 50 })
  model: string;

  @Column('int')
  number_of_seats: number;
}
