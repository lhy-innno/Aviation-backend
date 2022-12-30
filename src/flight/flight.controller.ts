import { FlightService, FlightRo } from './flight.service';
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

@ApiTags('航班')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post()
  async create(@Body() post) {
    return await this.flightService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get()
  async findAll(@Query() query): Promise<FlightRo> {
    return await this.flightService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.flightService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.flightService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.flightService.remove(id);
  }
}
