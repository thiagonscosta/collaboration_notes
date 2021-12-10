import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Note {
    user_id: string;
    title: string;
}