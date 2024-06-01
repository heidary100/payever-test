import { User } from './user';

describe('User', () => {
  it('should create an instance of User with provided id, name, and email', () => {
    const id = 'testUserId';
    const name = 'Test User';
    const email = 'test@example.com';

    const user = new User({ id, name, email });

    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });
});
