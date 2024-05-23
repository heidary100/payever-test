import { AvatarRepositoryInterface } from 'src/domain/interface/avatar.repository.interface';
import { Avatar } from '../../../../src/domain/avatar';

export class MemoryAvatarRepository implements AvatarRepositoryInterface {
  private avatars: Avatar[] = [];

  async create(avatar: Avatar): Promise<Avatar> {
    this.avatars.push(avatar);
    return avatar;
  }

  async findById(userId: string): Promise<Avatar | undefined> {
    return this.avatars.find((avatar) => avatar.userId === userId);
  }

  async deleteById(userId: string): Promise<void> {
    const index = this.avatars.findIndex((avatar) => avatar.userId === userId);
    if (index !== -1) {
      this.avatars.splice(index, 1);
    }
  }
}
