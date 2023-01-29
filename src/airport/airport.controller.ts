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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('机场')
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  /**
   * 创建文章
   * @param post
   */
  @Post('create')
  @ApiOperation({ summary: '创建机场' })
  async create(@Body() post) {
    return await this.airportService.create(post);
  }

  /**
   * 获取所有文章
   */
  @Get('getAll')
  @ApiOperation({ summary: '获取所有机场' })
  async findAll(@Query() query): Promise<AirportRo> {
    return await this.airportService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @Get('getSingle/:id')
  @ApiOperation({ summary: '获取单个机场' })
  async findById(@Param('id') id) {
    return await this.airportService.findById(id);
  }

  /**
   * 更新文章
   * @param id
   * @param post
   */
  @Put('update/:id')
  @ApiOperation({ summary: '更新机场' })
  async update(@Param('id') id, @Body() post) {
    return await this.airportService.updateById(id, post);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('delete/:id')
  @ApiOperation({ summary: '删除机场' })
  async remove(@Param('id') id) {
    return await this.airportService.remove(id);
  }
}
