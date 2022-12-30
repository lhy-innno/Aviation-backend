import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AirportEntity } from './airport.entity';

export interface AirportRo {
  list: AirportEntity[];
  count: number;
}
@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportEntity)
    private readonly airportEntityRepository: Repository<AirportEntity>,
  ) {}

  // 创建机场
  async create(airport: Partial<AirportEntity>): Promise<AirportEntity> {
    const { airport_name } = airport;
    if (!airport_name) {
      throw new HttpException('缺少机场名', 401);
    }
    const doc = await this.airportEntityRepository.findOne({
      where: { airport_name },
    });
    if (doc) {
      throw new HttpException('机场已存在', 401);
    }
    return await this.airportEntityRepository.save(airport);
  }

  // 获取机场列表
  async findAll(query): Promise<AirportRo> {
    const qb = await getRepository(AirportEntity).createQueryBuilder('airport');
    qb.where('1 = 1');
    qb.orderBy('airport.airport_id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const airports = await qb.getMany();
    return { list: airports, count: count };
  }

  // 获取指定机场
  async findById(id): Promise<AirportEntity> {
    return await this.airportEntityRepository.findOne(id);
  }

  // 更新机场
  async updateById(id, airport): Promise<AirportEntity> {
    const existAirport = await this.airportEntityRepository.findOne(id);
    if (!existAirport) {
      throw new HttpException(`id为${id}的机场不存在`, 401);
    }
    const updateUser = this.airportEntityRepository.merge(
      existAirport,
      airport,
    );
    return this.airportEntityRepository.save(updateUser);
  }

  // 刪除机场
  async remove(id) {
    const existAirport = await this.airportEntityRepository.findOne(id);
    if (!existAirport) {
      throw new HttpException(`id为${id}的机场不存在`, 401);
    }
    return await this.airportEntityRepository.remove(existAirport);
  }
}
