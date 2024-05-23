import { Avatar } from '../avatar';

export interface AvatarRepositoryInterface {
  create: (avatar: Avatar) => Promise<Avatar>;
  findById: (userId: string) => Promise<Avatar | null>;
  deleteById: (userId: string) => Promise<void>;
}
