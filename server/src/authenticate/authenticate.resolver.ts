import { Body, Req } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import TokenDTO from './dto/token-dto';
import { Request } from 'express';
import { LoginDto } from './dto/login-dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserDto } from './dto/user-dto';

@Resolver('Auth')
export class AuthenticateResolver {
  constructor(private readonly service: AuthenticateService) {}

  @Mutation(() => UserDto)
  authenticate(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return loginDto;
  }

  @Query(() => String)
  async authenticateWithGoogle(
    @Args('input') input: TokenDTO,
  ): Promise<string> {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.service.authenticateWithGoogle(input.token);
    // request.res.setHeader('Set-Cookie', [
    //   accessTokenCookie,
    //   refreshTokenCookie,
    // ]);
    console.log(accessTokenCookie, refreshTokenCookie, user);
    return input.token;
  }
}
