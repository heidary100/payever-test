import { Injectable } from '@nestjs/common';
import { User as UserDomain } from 'src/domain/user';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserEntityMapper {
  public mapDbToDomainEntity(databaseEntity: User): UserDomain {
    return new UserDomain({
      id: databaseEntity.id,
      name: databaseEntity.name,
      email: databaseEntity.email,
    });
  }

  public domainToDbEntity(user: UserDomain): User {
    return <User>{
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
