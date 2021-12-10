import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNote {
    @Field()
    user_id: string;
    
    @Field()
    title: string;

    @Field()
    content: string;
}