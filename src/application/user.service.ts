import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import axios from 'axios';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { UserRepositoryInterface } from 'src/domain/interface/user.repository.interface';
import { AvatarRepositoryInterface } from 'src/domain/interface/avatar.repository.interface';
import { User } from 'src/domain/user';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('AvatarRepositoryInterface')
    private readonly avatarRepository: AvatarRepositoryInterface,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: 'nestjs_queue',
      },
    });
  }

  async createUser(user: User): Promise<any> {
    const createdUser = await this.userRepository.create(user);

    this.client.emit('user_created', createdUser);

    // Dummy email sending logic
    console.log(`Sending email to ${user.email}`);
    return createdUser;
  }

  async getUser(userId: string): Promise<any> {
    const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);
    return data.data;
  }

  async getUserAvatar(userId: string): Promise<string> {
    const userAvatar = await this.avatarRepository.findById(userId);
    if (userAvatar) {
      return userAvatar.image;
    } else {
      const userData = await this.fetchUserData(userId);

      if (userData && userData.avatar) {
        const imageBuffer = await this.downloadImage(userData.avatar);

        const fileName = `${userId}_${crypto.randomBytes(16).toString('hex')}.jpg`;
        const imagePath = path.join(__dirname, '../avatars', fileName);
        fs.writeFileSync(imagePath, imageBuffer);

        this.avatarRepository.create({
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
    const userAvatar = await this.avatarRepository.findById(userId);
    if (!userAvatar) {
      throw new NotFoundException('User avatar not found');
    }

    const fileName = `${userId}_avatar.jpg`;
    const filePath = path.join(__dirname, 'avatars', fileName);
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      // console.error('Error removing avatar file:', error);
    }

    await this.avatarRepository.deleteById(userId);
  }

  async fetchUserData(userId: string): Promise<any> {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      return response.data.data;
    } catch (error) {
      // console.error('Error fetching user data:', error);
      return null;
    }
  }

  async downloadImage(url: string): Promise<Buffer> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      // console.error('Error downloading image:', error);
      return null;
    }
  }
}
