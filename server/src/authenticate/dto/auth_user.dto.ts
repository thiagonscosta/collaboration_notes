import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user';

@ObjectType()
export class AuthUser {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
