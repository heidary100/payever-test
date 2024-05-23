import { Injectable } from '@nestjs/common';
import { Avatar as AvatarDomain } from 'src/domain/avatar';
import { Avatar } from '../schemas/avatar.schema';

@Injectable()
export class AvatarEntityMapper {
  public mapDbToDomainEntity(databaseEntity: Avatar): AvatarDomain {
    return new AvatarDomain({
      userId: databaseEntity.userId,
      image: databaseEntity.image,
    });
  }

  public domainToDbEntity(user: AvatarDomain): Avatar {
    return <Avatar>{
      userId: user.userId,
      image: user.image,
    };
  }
}
