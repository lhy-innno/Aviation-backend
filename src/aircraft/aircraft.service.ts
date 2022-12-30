import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AircraftEntity } from './aircraft.entity';

export interface AircraftRo {
  list: AircraftEntity[];
  count: number;
}
@Injectable()
export class AircraftService {
  constructor(
    @InjectRepository(AircraftEntity)
    private readonly aircraftRepository: Repository<AircraftEntity>,
  ) {}

  // 创建飞机
  async create(aircraft: Partial<AircraftEntity>): Promise<AircraftEntity> {
    const { aircraft_id } = aircraft;
    if (!aircraft_id) {
      throw new HttpException('缺少飞机号', 401);
    }
    const doc = await this.aircraftRepository.findOne({
      where: { aircraft_id },
    });
    if (doc) {
      throw new HttpException('飞机已存在', 401);
    }
    return await this.aircraftRepository.save(aircraft);
  }

  // 获取飞机列表
  async findAll(query): Promise<AircraftRo> {
    const qb = await getRepository(AircraftEntity).createQueryBuilder(
      'aircraft',
    );
    qb.where('1 = 1');
    qb.orderBy('aircraft.aircraft_id', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定飞机
  async findById(id): Promise<AircraftEntity> {
    return await this.aircraftRepository.findOne(id);
  }

  // 更新飞机
  async updateById(id, aircraft): Promise<AircraftEntity> {
    const existAircraft = await this.aircraftRepository.findOne(id);
    if (!existAircraft) {
      throw new HttpException(`id为${id}的飞机不存在`, 401);
    }
    const updateAircraft = this.aircraftRepository.merge(
      existAircraft,
      aircraft,
    );
    return this.aircraftRepository.save(updateAircraft);
  }

  // 刪除飞机
  async remove(id) {
    const existAircraft = await this.aircraftRepository.findOne(id);
    if (!existAircraft) {
      throw new HttpException(`id为${id}的飞机不存在`, 401);
    }
    return await this.aircraftRepository.remove(existAircraft);
  }
}
