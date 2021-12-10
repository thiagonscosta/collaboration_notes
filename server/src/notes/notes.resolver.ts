import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/authenticate/auth.guard';

@Resolver('Notes')
export class NotesResolver {

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async notes() {
        return 'teste'
    }
}
