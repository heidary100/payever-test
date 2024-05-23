import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the User',
    example: 'jack',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiProperty({
    description: 'Email of the User',
    example: 'example@email.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;
}
