import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PassengerEntity } from './passenger.entity';

export interface PassengerRo {
  list: PassengerEntity[];
  count: number;
}
@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly passengerRepository: Repository<PassengerEntity>,
  ) {}

  // 创建乘客
  async create(passenger: Partial<PassengerEntity>): Promise<PassengerEntity> {
    const { name } = passenger;
    if (!name) {
      throw new HttpException('缺少乘客姓名', 401);
    }
    const doc = await this.passengerRepository.findOne({ where: { name } });
    if (doc) {
      throw new HttpException('乘客已存在', 401);
    }
    return await this.passengerRepository.save(passenger);
  }

  // 获取乘客列表
  async findAll(query): Promise<PassengerRo> {
    const qb = await getRepository(PassengerEntity).createQueryBuilder(
      'passenger',
    );
    qb.where('1 = 1');
    qb.orderBy('passenger.passenger_id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const passenger = await qb.getMany();
    return { list: passenger, count: count };
  }

  // 获取指定乘客
  async findById(id): Promise<PassengerEntity> {
    return await this.passengerRepository.findOne(id);
  }

  // 更新乘客
  async updateById(id, post): Promise<PassengerEntity> {
    const existPost = await this.passengerRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的乘客不存在`, 401);
    }
    const updatePost = this.passengerRepository.merge(existPost, post);
    return this.passengerRepository.save(updatePost);
  }

  // 刪除乘客
  async remove(id) {
    const existPassenger = await this.passengerRepository.findOne(id);
    if (!existPassenger) {
      throw new HttpException(`id为${id}的乘客不存在`, 401);
    }
    return await this.passengerRepository.remove(existPassenger);
  }
}
