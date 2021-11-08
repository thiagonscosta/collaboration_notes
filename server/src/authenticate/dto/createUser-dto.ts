import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Email is requide' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is requide' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is requide' })
  password: string;
}
