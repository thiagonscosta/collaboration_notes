import { Body } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import TokenDTO from './dto/token-dto';
import { LoginDto } from './dto/login-dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserDto } from './dto/user-dto';
import { CreateUserDto } from './dto/createUser-dto';

@Resolver('Auth')
export class AuthenticateResolver {
  constructor(private readonly service: AuthenticateService) {}

  @Query(() => UserDto)
  authenticate(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return loginDto;
  }

  // @Mutation(() => String)
  // async signup(@Args('input') input: CreateUserDto): Promise<string> {
  //   console.log(input);
  //   await this.service.signup(input);
  //   return input.username;
  // }

  @Mutation(() => String)
  async signupWithGoogle(@Args('input') input: TokenDTO): Promise<string> {
    console.log(input);
    await this.service.signupWithGoogle(input.token);
    return input.token;
  }

  @Query(() => String)
  async authenticateWithGoogle(
    @Args('input') input: TokenDTO,
  ): Promise<string> {
    //const { accessTokenCookie, refreshTokenCookie, user } =
    await this.service.authenticateWithGoogle(input.token);
    // request.res.setHeader('Set-Cookie', [
    //   accessTokenCookie,
    //   refreshTokenCookie,
    // ]);
    // console.log(accessTokenCookie, refreshTokenCookie, user);
    // console.log(input.token)
    return input.token;
  }
}
