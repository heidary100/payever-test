import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body() createUserDto: { name: string; email: string }) {
    return await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
    );
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Get('user/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: string) {
    return await this.userService.getUserAvatar(userId);
  }

  @Delete('user/:userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string) {
    return await this.userService.deleteUserAvatar(userId);
  }
}
