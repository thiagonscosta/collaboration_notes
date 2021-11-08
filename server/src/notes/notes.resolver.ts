import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Notes')
export class NotesResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
