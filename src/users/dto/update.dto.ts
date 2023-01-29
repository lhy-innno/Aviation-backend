import {
  IsString,
  IsMobilePhone,
  Length,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty({ description: '电话' })
  @IsNotEmpty({ message: '请输入电话' })
  @IsMobilePhone('zh-CN', undefined, {
    message: '电话格式不正确',
    context: {
      errorCode: 401,
    },
  })
  readonly phone: string;

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
    message: '邮箱格式不正确',
    context: {
      errorCode: 401,
    },
  })
  readonly email: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  @Length(6, 12)
  @IsString({
    message: '密码格式不正确，应该由6到12个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly password: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  @Length(2, 10)
  @IsString({
    message: '昵称格式不正确，应该由2到10个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly username: string;

  @ApiProperty({ description: '国籍' })
  @IsNotEmpty({ message: '请输入国籍' })
  @Length(2, 50)
  @IsString({
    message: '国籍格式不正确，应该由2到50个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly nationality: string;

  @ApiProperty({ description: '性别' })
  @IsNotEmpty({ message: '请输入性别' })
  @Length(2, 6)
  @IsString({
    message: '性别格式不正确，应该由2到6个字符组成',
    context: {
      errorCode: 401,
    },
  })
  readonly gender: string;
}
