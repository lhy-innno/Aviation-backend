import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import envConfig from '../config/env';
import { UsersEntity } from './users/users.entity';
import { AirportModule } from './airport/airport.module';
import { AirportEntity } from './airport/airport.entity';
import { AircraftModule } from './aircraft/aircraft.module';
import { AircraftEntity } from './aircraft/aircraft.entity';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightEntity } from './flight/flight.entity';
import { PassengerEntity } from './passenger/passenger.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [
          UsersEntity,
          AirportEntity,
          AircraftEntity,
          FlightEntity,
          PassengerEntity,
        ], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', '191711'), // 密码
        database: configService.get('DB_DATABASE', 'listenbourg airways'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    UsersModule,
    AirportModule,
    AircraftModule,
    FlightModule,
    PassengerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
