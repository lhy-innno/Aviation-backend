import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PassengerEntity } from './passenger.entity';
import { BuyTicketDto } from './dto/buyTicket.dto';
import { FlightEntity } from '../flight/flight.entity';

export interface PassengerRo {
  list: PassengerEntity[];
  count: number;
}
@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly passengerRepository: Repository<PassengerEntity>,
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
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

  // 买票
  async buyTicket(passenger: BuyTicketDto, id) {
    console.log('pa:', passenger);
    passenger.user_id = id;
    console.log(passenger);
    const { flight_flight_id, passport_number } = passenger;
    if (!flight_flight_id) {
      throw new HttpException('缺少航班号', 401);
    }
    const flight_id = flight_flight_id;
    const flight = await this.flightRepository.findOne({
      where: { flight_id },
    });
    if (!flight) {
      throw new HttpException('航班不存在', 404);
    }
    const person = await this.passengerRepository.findOne({
      where: { passport_number, flight_flight_id },
    });
    if (person) {
      throw new HttpException('该航班已存在此乘客', 401);
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

  async findTicket(id): Promise<PassengerEntity[]> {
    return await this.passengerRepository
      .createQueryBuilder('passenger')
      .where('passenger.user_id=:id', { id })
      .getMany();
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

  async cancel(user_id, passenger_id) {
    const existPassenger = await this.passengerRepository.findOne({
      where: { user_id, passenger_id },
    });
    if (!existPassenger) {
      throw new HttpException(`乘客不存在`, 401);
    }
    return await this.passengerRepository.remove(existPassenger);
  }
}
