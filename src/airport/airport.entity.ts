import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('airport')
export class AirportEntity {
  @PrimaryGeneratedColumn()
  airport_id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  airport_code: string;

  @Column({ length: 50 })
  airport_name: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  country: string;
}
