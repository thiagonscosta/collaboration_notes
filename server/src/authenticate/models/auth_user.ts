import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUser {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  token: string;
}
