import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvatarRepositoryInterface } from 'src/domain/interface/avatar.repository.interface';
import { Avatar as AvatarDomain } from 'src/domain/avatar';
import { Avatar } from '../schemas/avatar.schema';
import { AvatarEntityMapper } from '../mappers/avatar.entity.mapper';

@Injectable()
export class AvatarRepository implements AvatarRepositoryInterface {
  constructor(
    @InjectModel(Avatar.name) private readonly avatarModel: Model<Avatar>,
    private readonly avatarEntityMapper: AvatarEntityMapper,
  ) {}

  async create(avatar: AvatarDomain): Promise<AvatarDomain> {
    const createdAvatar = new this.avatarModel(
      this.avatarEntityMapper.domainToDbEntity(avatar),
    );
    await createdAvatar.save();
    return this.avatarEntityMapper.mapDbToDomainEntity(createdAvatar);
  }

  async findById(userId: string): Promise<AvatarDomain | null> {
    const avatar = await this.avatarModel.findOne({ userId }).exec();
    if (avatar) {
      return this.avatarEntityMapper.mapDbToDomainEntity(avatar);
    }
    return null;
  }

  async deleteById(userId: string): Promise<void> {
    await this.avatarModel.deleteOne({ userId: userId }).exec();
  }
}
