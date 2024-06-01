import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserEntityMapper } from '../mappers/user.entity.mapper';
import { User } from '../schemas/user.schema';

describe('UserRepository', () => {
  let repository: UserRepository;
  let userModelMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    userModelMock = {
      create: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        UserEntityMapper,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn(() => userModelMock), // Use jest.fn() to mock the constructor
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user in the database', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const saveMock = jest.fn();
      const userModelInstanceMock = { save: saveMock };

      userModelMock.create.mockReturnValueOnce(userModelInstanceMock);
      saveMock.mockResolvedValueOnce(userData);

      await repository.create(userData);

      expect(userModelMock.create).toHaveBeenCalledWith(userData);
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user by ID if found', async () => {
      const userId = 'userId';
      const user = { id: userId, name: 'John Doe', email: 'john@example.com' };

      userModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(user),
      });

      const result = await repository.findById(userId);

      expect(result).toEqual(user);
    });

    it('should return null if user with specified ID is not found', async () => {
      const userId = 'nonExistingUserId';

      userModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await repository.findById(userId);

      expect(result).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('should delete a user by ID', async () => {
      const userId = 'userId';

      userModelMock.deleteOne.mockResolvedValueOnce({ exec: jest.fn() });

      await repository.deleteById(userId);

      expect(userModelMock.deleteOne).toHaveBeenCalledWith({ id: userId });
    });
  });
});
