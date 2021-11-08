import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { type } from 'os';

@InputType()
class TokenDTO {
  // @IsString()
  // @IsNotEmpty()
  @Field()
  token: string;
}

export default TokenDTO;
