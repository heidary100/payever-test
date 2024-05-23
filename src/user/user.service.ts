import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor(private readonly userRepository: UserRepository) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        queue: 'nestjs_queue',
      },
    });
  }

  async createUser(name: string, email: string): Promise<any> {
    const createdUser = await this.userRepository.createUser(name, email);

    this.client.emit('user_created', createdUser);

    // Dummy email sending logic
    console.log(`Sending email to ${email}`);
    return createdUser;
  }

  // async getUser(userId: string): Promise<any> {
  //   const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);
  //   return data.data;
  // }

  // async getUserAvatar(userId: string): Promise<string> {
  //   const user = await this.userRepository.findById(userId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   const avatarPath = path.join(__dirname, '..', 'avatars', `${userId}.txt`);
  //   if (fs.existsSync(avatarPath)) {
  //     const avatar = fs.readFileSync(avatarPath, 'utf8');
  //     return avatar;
  //   }

  //   const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);
  //   const avatarUrl = data.data.avatar;
  //   const avatarResponse = await axios.get(avatarUrl, {
  //     responseType: 'arraybuffer',
  //   });
  //   const avatarBase64 = Buffer.from(avatarResponse.data).toString('base64');

  //   if (!fs.existsSync(path.join(__dirname, '..', 'avatars'))) {
  //     fs.mkdirSync(path.join(__dirname, '..', 'avatars'));
  //   }

  //   fs.writeFileSync(avatarPath, avatarBase64);
  //   return avatarBase64;
  // }

  // async deleteUserAvatar(userId: string): Promise<void> {
  //   const avatarPath = path.join(__dirname, '..', 'avatars', `${userId}.txt`);
  //   if (fs.existsSync(avatarPath)) {
  //     fs.unlinkSync(avatarPath);
  //   }
  //   await this.userRepository.deleteById(userId);
  // }
}
