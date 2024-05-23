import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MemoryDatabaseModule } from './fake/infrastructure/db/memory-database.module';
import { CreateUserDtoBuilder } from './builder/dto/create-user-dto.builder';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.withDatabase(MemoryDatabaseModule)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 201 on success when creating user', () => {
    const createUserDto = new CreateUserDtoBuilder().build();

    return request(app.getHttpServer())
      .post('/api/users')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);
  });

  it('returns 400 on wrong input parameters when creating user', () => {
    const createUserDto = new CreateUserDtoBuilder().withEmail('wrong').build();

    return request(app.getHttpServer())
      .post('/api/users')
      .send(createUserDto)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
