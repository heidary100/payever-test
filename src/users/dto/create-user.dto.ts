import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the User',
    example: 'jack',
    required: true,
  })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({
    description: 'Last name of the User',
    example: 'Jones',
    required: true,
  })
  @IsString()
  public readonly lastName: string;

  @ApiProperty({
    description: 'Email of the User',
    example: 'example@email.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  public readonly email: string;
}
