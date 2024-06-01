/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create User',
    description: 'Endpoint to create a new user.',
  })
  @ApiCreatedResponse({
    description: 'User has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, wrong parameterization.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get User by ID',
    description: 'Endpoint to retrieve user details by user ID.',
  })
  @ApiNotFoundResponse({
    description: 'User with specified ID not found.',
  })
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Get('user/:userId/avatar')
  @ApiOperation({
    summary: 'Get User Avatar by ID',
    description: 'Endpoint to retrieve user avatar by user ID.',
  })
  @ApiNotFoundResponse({
    description: 'Avatar for the user with specified ID not found.',
  })
  async getUserAvatar(@Param('userId') userId: string) {
    return await this.userService.getUserAvatar(userId);
  }

  @Delete('user/:userId/avatar')
  @ApiOperation({
    summary: 'Delete User Avatar by ID',
    description: 'Endpoint to delete user avatar by user ID.',
  })
  @ApiNoContentResponse({
    description: 'User avatar has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Avatar for the user with specified ID not found.',
  })
  async deleteUserAvatar(@Param('userId') userId: string) {
    return await this.userService.deleteUserAvatar(userId);
  }
}
