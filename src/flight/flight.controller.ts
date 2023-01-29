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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('航班')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  /**
   * 创建航班
   * @param flight
   */
  @ApiOperation({ summary: '创建航班' })
  @Post('create')
  async create(@Body() flight) {
    return await this.flightService.create(flight);
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取所有航班' })
  @Get('getAll')
  async findAll(@Query() query): Promise<FlightRo> {
    return await this.flightService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取单个航班' })
  @Get('getSingle/:id')
  async findById(@Param('id') id) {
    return await this.flightService.findById(id);
  }

  /**
   * 更新航班
   * @param id
   * @param flight
   */
  @ApiOperation({ summary: '更新航班' })
  @Put('update/:id')
  async update(@Param('id') id, @Body() flight) {
    return await this.flightService.updateById(id, flight);
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({ summary: '删除航班' })
  @Delete('delete/:id')
  async remove(@Param('id') id) {
    return await this.flightService.remove(id);
  }
}
