import { Body, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { SignUpDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';

export interface UsersRo {
  list: UsersEntity[];
  count: number;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // 创建用户
  // async create(user: Partial<UsersEntity>): Promise<UsersEntity> {
  //   const { name } = user;
  //   if (!name) {
  //     throw new HttpException('缺少用户姓名', 401);
  //   }
  //   const doc = await this.usersRepository.findOne({ where: { name } });
  //   if (doc) {
  //     throw new HttpException('用户已存在', 401);
  //   }
  //   return await this.usersRepository.save(user);
  // }

  // 注册
  async signUp(user: SignUpDto) {
    const { username, email, phone } = user;
    let existUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    existUser = await this.usersRepository.findOne({
      where: { phone },
    });
    if (existUser) {
      throw new HttpException('电话号已存在', HttpStatus.BAD_REQUEST);
    }

    existUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existUser) {
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return await this.usersRepository.findOne({ where: { username } });
  }

  // 获取用户列表
  async findAll(query): Promise<UsersRo> {
    const qb = await getRepository(UsersEntity).createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const users = await qb.getMany();
    return { list: users, count: count };
  }

  // 获取指定用户
  async findById(id): Promise<UsersEntity> {
    return await this.usersRepository.findOne(id);
  }

  // 更新用户
  async updateById(id, user: UpdateDto): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    const updateUser = this.usersRepository.merge(existUser, user);
    return this.usersRepository.save(updateUser);
  }

  async updateInformation(userInfo: UpdateDto, user): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne(user.id);
    const updateUser = this.usersRepository.merge(existUser, userInfo);
    return this.usersRepository.save(updateUser);
  }

  // 刪除用户
  async remove(id) {
    const existUser = await this.usersRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    return await this.usersRepository.remove(existUser);
  }
}
