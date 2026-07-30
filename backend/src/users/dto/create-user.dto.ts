import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Shristy',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'shristy@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Password with at least 8 characters',
  })
  @MinLength(8)
  password!: string;
}