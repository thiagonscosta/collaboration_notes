import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { AuthenticateRepository } from './authenticate.repository';
import { AuthUser } from './dto/auth_user.dto';
import { CreateUserDto } from './dto/createUser-dto';
import { User } from './models/user';

@Injectable()
export class AuthenticateService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly repository: AuthenticateRepository,
    private readonly jwtService: JwtService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async signupWithGoogle(token: string) {
    const userInfo = await this.getUserData(token);

    console.log(userInfo);

    if (!userInfo.verified_email) {
      throw new HttpException('Invalid email', 403);
    }

    const userData = {
      username: userInfo.name ?? userInfo.email,
      email: userInfo.email,
      auth_with_google: true,
    };

    const user = this.repository.signupWithGoogle(userData);

    return user;
  }

  async signup(data: CreateUserDto): Promise<User> {
    const user = await this.repository.signupWithGoogle(data);
    return user;
  }

  async authenticateWithGoogle(token: string): Promise<AuthUser> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    if (!tokenInfo.email_verified) {
      throw new HttpException('Invalid email', 403);
    }

    const email = tokenInfo.email;

    const user: User = await this.repository.authenticateWithGoogle({ email });

    const jwt = await this.jwtToken(user);

    const authUser: AuthUser = {
      user,
      token: jwt,
    };

    return authUser;
  }

  async getTokenInfo(token: string) {
    return await this.oauthClient.getTokenInfo(token);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const infoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return infoResponse.data;
  }

  private jwtToken(auth: User): Promise<string> {
    const payload = { username: auth.username, sub: auth.id };
    return this.jwtService.signAsync(payload);
  }
}
