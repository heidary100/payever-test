import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { NestApplication } from '@nestjs/core';
import { MemoryUserRepository } from 'test/fake/infrastructure/db/memory.user.repository';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { MemoryDatabaseModule } from 'test/fake/infrastructure/db/memory-database.module';

export class ComponentTestHelper {
  public async createTestingModule() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.withDatabase(MemoryDatabaseModule)],
    }).compile();

    return moduleFixture;
  }

  public async createApp(
    testingModule: TestingModule,
  ): Promise<INestApplication> {
    const app = testingModule.createNestApplication();
    await app.init();

    return app;
  }

  public async closeApp(app: NestApplication): Promise<void> {
    await app.close();
  }

  public getUserRepository(app: NestApplication): MemoryUserRepository {
    return app.get<MemoryUserRepository>('UserRepositoryInterface');
  }
}
