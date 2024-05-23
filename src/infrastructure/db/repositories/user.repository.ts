import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryInterface } from 'src/domain/interface/user.repository.interface';
import { UserEntityMapper } from '../mappers/user.entity.mapper';
import { User as UserDomain } from 'src/domain/user';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userEntityMapper: UserEntityMapper,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    const createdUser = new this.userModel(
      this.userEntityMapper.domainToDbEntity(user),
    );
    await createdUser.save();
    return this.userEntityMapper.mapDbToDomainEntity(createdUser);
  }

  async findById(userId: string): Promise<UserDomain | null> {
    const user = await this.userModel.findById(userId).exec();
    if (user) {
      return this.userEntityMapper.mapDbToDomainEntity(user);
    }
    return null;
  }

  async deleteById(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }
}
