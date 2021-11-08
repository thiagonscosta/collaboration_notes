import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
