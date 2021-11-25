import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Email is requide' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is requide' })
  @Field()
  password: string;
}
