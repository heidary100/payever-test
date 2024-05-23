import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

// Mocking avatar repository for testing purposes
class MockAvatarRepository {
  findById = jest.fn();
  deleteById = jest.fn();
  create = jest.fn();
}

describe('UserService', () => {
  let userService: UserService;
  let avatarRepository: MockAvatarRepository;

  beforeEach(() => {
    avatarRepository = new MockAvatarRepository();
    userService = new UserService(null, avatarRepository); // Inject any other mocks or dependencies as needed
  });

  describe('getUserAvatar', () => {
    it('should return user avatar if found in repository', async () => {
      const userId = 'testUserId';
      const expectedImage = 'testImageData';
      avatarRepository.findById.mockResolvedValueOnce({
        userId,
        image: expectedImage,
      });

      const result = await userService.getUserAvatar(userId);

      expect(result).toBe(expectedImage);
      expect(avatarRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user data or avatar not found', async () => {
      const userId = 'testUserId';
      const userData = { avatar: null };

      avatarRepository.findById.mockResolvedValueOnce(null);
      userService.fetchUserData = jest.fn().mockResolvedValueOnce(userData);

      await expect(userService.getUserAvatar(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteUserAvatar', () => {
    it('should delete user avatar if found in repository', async () => {
      const userId = '1';
      avatarRepository.findById.mockResolvedValueOnce({
        userId,
        image: 'testImageData',
      });

      await userService.deleteUserAvatar(userId);

      expect(avatarRepository.deleteById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user avatar not found', async () => {
      const userId = 'testUserId';
      avatarRepository.findById.mockResolvedValueOnce(null);

      await expect(userService.deleteUserAvatar(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
