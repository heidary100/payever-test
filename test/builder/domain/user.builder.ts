import { randomUUID } from 'crypto';
import { User } from '../../../src/domain/user';

interface UserBuilderProperties {
  id: string;
  name: string;
  email: string;
}

export class UserBuilder {
  private properties: UserBuilderProperties = {
    id: randomUUID(),
    name: 'john',
    email: 'sample@email.com',
  };

  public withId(id: string): this {
    this.properties.id = id;
    return this;
  }

  public withName(name: string): this {
    this.properties.name = name;
    return this;
  }

  public withEmail(email: string): this {
    this.properties.email = email;
    return this;
  }

  public build(): User {
    return new User({ ...this.properties });
  }
}
