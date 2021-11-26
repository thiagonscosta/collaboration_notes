import { AuthenticateService } from './authenticate.service';
import TokenDTO from './dto/token-dto';
import { LoginDto } from './dto/login-dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from './models/auth_user';
import { CreateUserDto } from './dto/createUser-dto';

@Resolver('Auth')
export class AuthenticateResolver {
  constructor(private readonly service: AuthenticateService) {}

  @Query(() => AuthUser)
  authenticate(@Args('input') input: LoginDto) {
    return input.email;
  }

  @Mutation(() => AuthUser)
  async signup(@Args('input') input: CreateUserDto): Promise<AuthUser> {
    return this.service.signup(input);
  }

  @Mutation(() => AuthUser)
  async signupWithGoogle(@Args('input') input: TokenDTO): Promise<AuthUser> {
    const user = this.service.signupWithGoogle(input.token);
    return user;
  }

  @Query(() => AuthUser)
  async authenticateWithGoogle(@Args('input') input: TokenDTO) {
    const data = await this.service.authenticateWithGoogle(input.token);
    const user: AuthUser = {
      id: data.id,
      email: data.email,
      username: data.username,
      token: 'toke',
    };
    console.log(user);
    return user;
  }
}
