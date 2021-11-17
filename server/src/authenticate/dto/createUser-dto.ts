import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email is requide' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Username is requide' })
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is requide' })
  password: string;
}

