import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('passenger')
export class PassengerEntity {
  @PrimaryGeneratedColumn()
  passenger_id: number; // 标记为主列，值自动生成

  @Column()
  user_id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  passport_number: string;

  @Column({ length: 50 })
  phone_number: string;

  @Column('bigint')
  flight_flight_id: number;
}
