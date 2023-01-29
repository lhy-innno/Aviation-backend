import {
  IsString,
  IsMobilePhone,
  Length,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyTicketDto {
  @ApiProperty({ description: '电话' })
  @IsNotEmpty({ message: '请输入电话' })
  @IsMobilePhone('zh-CN', undefined, {
    message: '电话格式不正确',
    context: {
      errorCode: 401,
    },
  })
  readonly phone_number: string;

  @ApiProperty({ description: '姓名' })
  @IsNotEmpty({ message: '请输入姓名' })
  @Length(3, 20)
  @IsString({
    message: '姓名格式不正确，应该由3到20个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly name: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: '请输入邮箱' })
  @Length(5, 50)
  @IsEmail(undefined, {
    message: '邮箱格式不值钱',
    context: {
      errorCode: 401,
    },
  })
  readonly email: string;

  @ApiProperty({ description: '航班号' })
  @IsNotEmpty({ message: '请输入航班id' })
  @IsNumber(undefined, {
    message: 'id请传入数字',
    context: {
      errorCode: 401,
    },
  })
  readonly flight_flight_id: number;

  @ApiProperty({ description: '护照号' })
  @IsNotEmpty({ message: '请输入护照号' })
  @Length(8, 20)
  @IsString({
    message: '国护照号格式不正确，应该由8到20个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly passport_number: string;
  user_id: number;
}
