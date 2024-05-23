import { UserRepositoryInterface } from '../../../../src/domain/interface/user.repository.interface';
import { User } from '../../../../src/domain/user';
import { UserBuilder } from '../../../builder/domain/user.builder';

export class MemoryUserRepository implements UserRepositoryInterface {
  private users: User[] = [];

  async findById(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === userId);
  }

  async deleteById(userId: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async create(user: User): Promise<User> {
    const newUser = new UserBuilder()
      .withName(user.name)
      .withEmail(user.email)
      .build();
    this.users.push(newUser);
    return newUser;
  }
}
