import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { FlightEntity } from './flight.entity';

export interface FlightRo {
  list: FlightEntity[];
  count: number;
}
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
  ) {}

  // 创建文章
  async create(flight: Partial<FlightEntity>): Promise<FlightEntity> {
    const { flight_id } = flight;
    if (!flight_id) {
      throw new HttpException('缺少航班id', 401);
    }
    const doc = await this.flightRepository.findOne({ where: { flight_id } });
    if (doc) {
      throw new HttpException('航班已存在', 401);
    }
    return await this.flightRepository.save(flight);
  }

  // 获取航班列表
  async findAll(query): Promise<FlightRo> {
    const qb = await getRepository(FlightEntity).createQueryBuilder('flight');
    qb.where('1 = 1');
    qb.orderBy('flight.flight_id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定航班
  async findById(id): Promise<FlightEntity> {
    return await this.flightRepository.findOne(id);
  }

  // 更新文章
  async updateById(id, flight): Promise<FlightEntity> {
    const existFlight = await this.flightRepository.findOne(id);
    if (!existFlight) {
      throw new HttpException(`id为${id}的航班不存在`, 401);
    }
    const updateFlight = this.flightRepository.merge(existFlight, flight);
    return this.flightRepository.save(updateFlight);
  }

  // 刪除文章
  async remove(id) {
    const existFlight = await this.flightRepository.findOne(id);
    if (!existFlight) {
      throw new HttpException(`id为${id}的航班不存在`, 401);
    }
    return await this.flightRepository.remove(existFlight);
  }
}
