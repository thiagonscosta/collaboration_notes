import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Email is requide' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is requide' })
  password: string;
}
