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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('飞机')
@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post('create')
  @ApiOperation({ summary: '创建飞机' })
  async create(@Body() post) {
    return await this.aircraftService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get('getAll')
  @ApiOperation({ summary: '获取全部飞机' })
  async findAll(@Query() query): Promise<AircraftRo> {
    return await this.aircraftService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get('getSingle/:id')
  @ApiOperation({ summary: '获取单个飞机' })
  async findById(@Param('id') id) {
    return await this.aircraftService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put('update/:id')
  @ApiOperation({ summary: '更新飞机' })
  async update(@Param('id') id, @Body() post) {
    return await this.aircraftService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('delete/:id')
  @ApiOperation({ summary: '删除飞机' })
  async remove(@Param('id') id) {
    return await this.aircraftService.remove(id);
  }
}
