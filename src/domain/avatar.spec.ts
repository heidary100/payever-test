import { Avatar } from './avatar';

describe('Avatar', () => {
  it('should create an instance of Avatar with provided userId and image', () => {
    const userId = 'testUserId';
    const image = 'testImageData';

    const avatar = new Avatar({ userId, image });

    expect(avatar.userId).toBe(userId);
    expect(avatar.image).toBe(image);
  });
});
