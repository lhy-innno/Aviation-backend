import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  createToken(user: Partial<UsersEntity>) {
    return this.jwtService.sign(user);
  }
  async login(user: Partial<UsersEntity>) {
    const { username } = user;
    const person = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    const token = this.createToken({
      id: person.id,
    });

    return { token };
  }

  async getUser(user) {
    return await this.userService.findById(user.id);
  }
}
