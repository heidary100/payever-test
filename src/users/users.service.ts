/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import axios from 'axios';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { User } from 'src/users/entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { Avatar } from './entities/avatar';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private avatars: Avatar[] = [];

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new User(
      crypto.randomUUID(),
      user.firstName,
      user.lastName,
      user.email,
    );
    this.users.push(newUser);

    // Dummy email sending logic, that's too dumb
    console.log(`Sending email to ${user.email}`);
    return newUser;
  }

  async getUser(userId: string): Promise<any> {
    const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);
    return data.data;
  }

  async getUserAvatar(userId: string): Promise<string> {
    const userAvatar = this.avatars.find((avatar) => avatar.userId === userId);
    if (userAvatar) {
      return userAvatar.image;
    } else {
      const userData = await this.getUser(userId);

      if (userData && userData.avatar) {
        const response = await axios.get(userData.avatar, {
          responseType: 'arraybuffer',
        });
        const imageBuffer = Buffer.from(response.data, 'binary');

        const fileName = `${userId}_${crypto.randomBytes(16).toString('hex')}.jpg`;
        const imagePath = path.join(__dirname, '../avatars', fileName);
        fs.writeFileSync(imagePath, imageBuffer);

        this.avatars.push({
          userId,
          image: imageBuffer.toString('base64'),
        });

        return imageBuffer.toString('base64');
      } else {
        throw new NotFoundException();
      }
    }
  }

  async deleteUserAvatar(userId: string): Promise<void> {
    const userAvatar = this.avatars.find((avatar) => avatar.userId === userId);
    if (!userAvatar) {
      throw new NotFoundException('User avatar not found');
    }

    const fileName = `${userId}_avatar.jpg`;
    const filePath = path.join(__dirname, 'avatars', fileName);
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    this.avatars = this.avatars.filter((avatar) => avatar.userId !== userId);
  }
}
