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
} from '@nestjs/swagger';
import { CreateUserDto } from './resources/incoming/create-user.dto';

@ApiTags('users')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'create user',
    description: 'Creates User',
  })
  @ApiCreatedResponse({
    description: 'User has been created',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, wrong parameterization',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
    });
  }

  // @Get('user/:userId')
  // @ApiOperation({ summary: 'Retrieves User data from reqres' })
  // @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  // async getUser(@Param('userId') userId: string) {
  //   return 'hellpo' + userId;
  //   // return await this.userService.getUser(userId);
  // }

  @Get('user/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: string) {
    return await this.userService.getUserAvatar(userId);
  }

  @Delete('user/:userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string) {
    return await this.userService.deleteUserAvatar(userId);
  }
}
