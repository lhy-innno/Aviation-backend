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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BuyTicketDto } from './dto/buyTicket.dto';

@ApiTags('乘客')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  /**
   * 创建乘客
   * @param passenger
   */
  @Post('create')
  @ApiOperation({ summary: '新增乘客（管理员）' })
  async create(@Body() passenger) {
    return await this.passengerService.create(passenger);
  }

  /**
   * 买票
   * @param passenger
   * @param req
   */
  @Post('buyTicket')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '买票' })
  async buyTicket(@Body() passenger: BuyTicketDto, @Req() req) {
    console.log('dd', req.user);
    return await this.passengerService.buyTicket(passenger, req.user.id);
  }

  /**
   * 获取全部乘客
   */
  @Get('getAll')
  @ApiOperation({ summary: '获取全部乘客' })
  async findAll(@Query() query): Promise<PassengerRo> {
    return await this.passengerService.findAll(query);
  }

  /**
   * 获取指定乘客
   * @param id
   */
  @Get('getSingle/:id')
  @ApiOperation({ summary: '获取指定乘客（管理员）' })
  async findById(@Param('id') id) {
    return await this.passengerService.findById(id);
  }

  /**
   * 获取买过的票
   * @param req
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('ticket')
  @ApiOperation({ summary: '获取买票信息' })
  async findTicket(@Req() req) {
    return await this.passengerService.findTicket(req.user.id);
  }

  /**
   * 更新乘客(管理员)
   * @param id
   * @param post
   */
  @Put('update/:id')
  @ApiOperation({ summary: '更新乘客(管理员)' })
  async update(@Param('id') id, @Body() post) {
    return await this.passengerService.updateById(id, post);
  }

  /**
   * 删除乘客(管理员)
   * @param id
   */
  @Delete('delete/:id')
  @ApiOperation({ summary: '删除乘客(管理员)' })
  async remove(@Param('id') id) {
    return await this.passengerService.remove(id);
  }

  /**
   * 退票
   * @param id
   * @param req
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('cancel/:id')
  @ApiOperation({ summary: '退票' })
  async cancel(@Param('id') id, @Req() req) {
    return await this.passengerService.cancel(req.user.id, id);
  }
}
