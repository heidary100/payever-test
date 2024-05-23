import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getUser: jest.fn(),
            getUserAvatar: jest.fn(),
            deleteUserAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userService.createUser with correct arguments', async () => {
      const createUserDto = { name: 'John', email: 'john@example.com' };
      await controller.createUser(createUserDto);
      expect(userService.createUser).toHaveBeenCalledWith(
        createUserDto.name,
        createUserDto.email,
      );
    });
  });

  describe('getUser', () => {
    it('should call userService.getUser with correct userId', async () => {
      const userId = '123';
      await controller.getUser(userId);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserAvatar', () => {
    it('should call userService.getUserAvatar with correct userId', async () => {
      const userId = '123';
      await controller.getUserAvatar(userId);
      expect(userService.getUserAvatar).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteUserAvatar', () => {
    it('should call userService.deleteUserAvatar with correct userId', async () => {
      const userId = '123';
      await controller.deleteUserAvatar(userId);
      expect(userService.deleteUserAvatar).toHaveBeenCalledWith(userId);
    });
  });
});
