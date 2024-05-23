import { UserRepositoryInterface } from '../../../../src/domain/interface/user.repository.interface';
import { User } from '../../../../src/domain/user';
import { UserBuilder } from '../../../builder/domain/user.builder';

export class MemoryUserRepository implements UserRepositoryInterface {
  private users: User[] = [];

  async create(name: string, email: string): Promise<User> {
    const newUser = new UserBuilder().withName(name).withEmail(email).build();
    this.users.push(newUser);
    return newUser;
  }
}
