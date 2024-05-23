import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('api')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({ summary: 'Create a User' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() createUserDto: { name: string; email: string }) {
    return await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
    );
  }

  // @Get('user/:userId')
  // async getUser(@Param('userId') userId: string) {
  //   return await this.userService.getUser(userId);
  // }

  // @Get('user/:userId/avatar')
  // async getUserAvatar(@Param('userId') userId: string) {
  //   return await this.userService.getUserAvatar(userId);
  // }

  // @Delete('user/:userId/avatar')
  // async deleteUserAvatar(@Param('userId') userId: string) {
  //   return await this.userService.deleteUserAvatar(userId);
  // }
}
