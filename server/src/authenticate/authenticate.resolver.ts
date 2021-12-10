import { AuthenticateService } from './authenticate.service';
import TokenDTO from './dto/token-dto';
import { LoginDto } from './dto/login-dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from './dto/auth_user.dto';
import { CreateUserDto } from './dto/createUser-dto';
import { User } from './models/user';

@Resolver('Auth')
export class AuthenticateResolver {
  constructor(private readonly service: AuthenticateService) {}

  @Query(() => AuthUser)
  authenticate(@Args('input') input: LoginDto) {
    return input.email;
  }

  @Mutation(() => AuthUser)
  async signup(@Args('input') input: CreateUserDto): Promise<User> {
    return this.service.signup(input);
  }

  @Mutation(() => AuthUser)
  async signupWithGoogle(@Args('input') input: TokenDTO): Promise<User> {
    const user = this.service.signupWithGoogle(input.token);
    return user;
  }

  @Query(() => AuthUser)
  async authenticateWithGoogle(@Args('input') input: TokenDTO) {
    const user = await this.service.authenticateWithGoogle(input.token);
    return user;
  }
}
