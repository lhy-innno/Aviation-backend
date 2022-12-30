import { AirportService, AirportRo } from './airport.service';
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

@ApiTags('机场')
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post()
  async create(@Body() post) {
    return await this.airportService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get()
  async findAll(@Query() query): Promise<AirportRo> {
    return await this.airportService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.airportService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.airportService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.airportService.remove(id);
  }
}
