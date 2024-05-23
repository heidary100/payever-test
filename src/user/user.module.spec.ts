import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('UserModule', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        {
          provide: getModelToken('User'), // Use the model name used in the UserModule
          useValue: {}, // Provide a mock value
        },
        UserRepository,
        UserService,
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
