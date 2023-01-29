import { UsersService, UsersRo } from './users.service';
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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 创建用户
   * @param post
   */
  // @ApiOperation({ summary: '创建用户' })
  // @Post('create')
  // async create(@Body() post) {
  //   return await this.usersService.create(post);
  // }

  /**
   * 注册用户
   * @param user
   */
  @ApiOperation({ summary: '注册用户' })
  @Post('signup')
  async signup(@Body() user: SignUpDto) {
    return await this.usersService.signUp(user);
  }

  /**
   * 获取所有用户
   */
  @ApiOperation({ summary: '获取用户列表' })
  @Get('getAll')
  async findAll(@Query() query): Promise<UsersRo> {
    return await this.usersService.findAll(query);
  }

  /**
   * 管理员获取指定用户
   * @param id
   */
  @Get('getSingle/:id')
  @ApiOperation({ summary: '获取指定用户(管理员)' })
  async findById(@Param('id') id) {
    return await this.usersService.findById(id);
  }

  /**
   * 获取个人信息
   * @param req
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取个人信息' })
  @Get('getInformation')
  async findInformation(@Req() req) {
    return req.user;
  }

  /**
   * 更新用户
   * @param id
   * @param user
   */
  @Put('update/:id')
  @ApiOperation({ summary: '更新用户(管理员)' })
  async update(@Param('id') id, @Body() user: UpdateDto) {
    return await this.usersService.updateById(id, user);
  }

  /**
   * 更新个人信息
   * @param userInfo
   * @param req
   */
  @Put('updateInformation')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '更新个人信息' })
  async updateInformation(@Body() userInfo: UpdateDto, @Req() req) {
    console.log('user:', req.user);
    return await this.usersService.updateInformation(userInfo, req.user);
  }

  /**
   * 删除用户
   * @param id
   */
  @Delete('delete/:id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id) {
    return await this.usersService.remove(id);
  }
}
