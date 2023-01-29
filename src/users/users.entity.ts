import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  name: string;

  @Exclude()
  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  gender: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 50 })
  nationality: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd() {
    if (!this.password) return;
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
