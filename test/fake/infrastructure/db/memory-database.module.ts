import { Module } from '@nestjs/common';
import { MemoryUserRepository } from './memory.user.repository';
import { MemoryAvatarRepository } from './memory.avatar.repository';

@Module({
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: MemoryUserRepository,
    },
    {
      provide: 'AvatarRepositoryInterface',
      useClass: MemoryAvatarRepository,
    },
  ],
  exports: ['UserRepositoryInterface', 'AvatarRepositoryInterface'],
})
export class MemoryDatabaseModule {}
