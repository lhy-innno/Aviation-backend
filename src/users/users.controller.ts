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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignUpDto } from './dto/users.dto';

@ApiTags('用户')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 创建用户
   * @param post
   */
  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() post) {
    return await this.usersService.create(post);
  }

  /**
   * 注册用户
   * @param user
   */
  @ApiOperation({ summary: '注册用户' })
  @Post('signup')
  async signup(@Body() user: SignUpDto) {
    console.log(111);
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
   * 获取指定用户
   * @param id
   */
  @Get(':id')
  @ApiOperation({ summary: '获取指定用户' })
  async findById(@Param('id') id) {
    return await this.usersService.findById(id);
  }

  /**
   * 更新用户
   * @param id
   * @param user
   */
  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id, @Body() user) {
    return await this.usersService.updateById(id, user);
  }

  /**
   * 删除用户
   * @param id
   */
  @Delete('id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id) {
    return await this.usersService.remove(id);
  }
}
