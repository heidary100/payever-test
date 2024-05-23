import { IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;

  constructor({
    id = null,
    name,
    email,
  }: {
    id: string;
    name: string;
    email: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
