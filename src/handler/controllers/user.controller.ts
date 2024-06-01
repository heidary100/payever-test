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
import { UserService } from '../../application/user.service';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'; 
import { CreateUserDto } from './resources/incoming/create-user.dto';

@ApiTags('users')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return await this.userService.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
    });
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
    return await this.userService.getUser(userId);
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
