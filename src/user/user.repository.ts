// user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    const createdUser = new this.userModel({ name, email });
    return await createdUser.save();
  }

  // async findById(userId: string): Promise<User | null> {
  //   return await this.userModel.findById(userId).exec();
  // }

  // async deleteById(userId: string): Promise<void> {
  //   await this.userModel.deleteOne({ _id: userId }).exec();
  // }
}
