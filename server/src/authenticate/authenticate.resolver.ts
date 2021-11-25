import { AuthenticateService } from './authenticate.service';
import TokenDTO from './dto/token-dto';
import { LoginDto } from './dto/login-dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './models/user';
import { CreateUserDto } from './dto/createUser-dto';

@Resolver('Auth')
export class AuthenticateResolver {
  constructor(private readonly service: AuthenticateService) {}

  @Query(() => String)
  authenticate(@Args('input') input: LoginDto) {
    console.log(input);
    return input.email;
  }

  @Mutation(() => User)
  async signup(@Args('input') input: CreateUserDto): Promise<User> {
    console.log(input);
    return this.service.signup(input);
  }

  @Mutation(() => String)
  async signupWithGoogle(@Args('input') input: TokenDTO): Promise<User> {
    const user = this.service.signupWithGoogle(input.token);
    return user;
  }

  @Query(() => User)
  async authenticateWithGoogle(@Args('input') input: TokenDTO) {
    const data = await this.service.authenticateWithGoogle(input.token);
    const user: User = {
      id: data.id,
      email: data.email,
      username: data.username,
    };
    return user;
  }
}
