import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarRepository } from './repositories/avatar.repository';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';
import { UserEntityMapper } from './mappers/user.entity.mapper';
import { AvatarEntityMapper } from './mappers/avatar.entity.mapper';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Avatar.name, schema: AvatarSchema },
    ]),
  ],
  providers: [
    UserEntityMapper,
    AvatarEntityMapper,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'AvatarRepositoryInterface',
      useClass: AvatarRepository,
    },
  ],
  exports: ['UserRepositoryInterface', 'AvatarRepositoryInterface'],
})
export class DatabaseModule {}
