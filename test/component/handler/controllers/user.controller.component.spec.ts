import { HttpStatus } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { ComponentTestHelper } from '../../component-test.helper';
import { CreateUserDtoBuilder } from 'test/builder/dto/create-user-dto.builder';
import * as request from 'supertest';

describe('Users API', () => {
  //   let userRepository: MemoryUserRepository;
  const helper = new ComponentTestHelper();
  let testingModule: TestingModule;
  let app: any;

  beforeAll(async () => {
    testingModule = await helper.createTestingModule();
    app = await helper.createApp(testingModule);
    // userRepository = helper.getUserRepository(app);
  });

  // afterEach(() => {
  //     discountCodeRepository.clear();
  // });

  it('returns 201 on success when creating user', () => {
    const createUserDto = new CreateUserDtoBuilder().build();

    return request(app.getHttpServer())
      .post('/')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);
  });
});
