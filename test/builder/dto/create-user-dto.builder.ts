import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateUserDtoBuilder {
  private properties: CreateUserDto = {
    name: 'john',
    email: 'email@example.com',
  };

  public withName(name: string): this {
    this.properties.name = name;
    return this;
  }

  public withEmail(email: string): this {
    this.properties.email = email;
    return this;
  }

  build(): CreateUserDto {
    return this.properties;
  }
}
