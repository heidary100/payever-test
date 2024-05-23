import { Module } from '@nestjs/common';
import { MemoryUserRepository } from './memory.user.repository';

@Module({
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: MemoryUserRepository,
    },
  ],
  exports: ['UserRepositoryInterface'],
})
export class MemoryDatabaseModule {}
