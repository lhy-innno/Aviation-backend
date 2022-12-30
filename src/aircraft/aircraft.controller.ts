import { AircraftService, AircraftRo } from './aircraft.service';
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

@ApiTags('飞机')
@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post()
  async create(@Body() post) {
    return await this.aircraftService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get()
  async findAll(@Query() query): Promise<AircraftRo> {
    return await this.aircraftService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.aircraftService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.aircraftService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.aircraftService.remove(id);
  }
}
