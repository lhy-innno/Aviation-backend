import { PassengerService, PassengerRo } from './passenger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('乘客')
@Controller('post')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post()
  async create(@Body() post) {
    return await this.passengerService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get()
  async findAll(@Query() query): Promise<PassengerRo> {
    return await this.passengerService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.passengerService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.passengerService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.passengerService.remove(id);
  }
}
