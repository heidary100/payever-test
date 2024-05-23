import { User } from '../user';

export interface UserRepositoryInterface {
  create: (user: User) => Promise<User>;
  findById: (userId: string) => Promise<User | null>;
  deleteById: (userId: string) => Promise<void>;
}
