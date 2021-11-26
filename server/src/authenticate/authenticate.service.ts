import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { AuthenticateRepository } from './authenticate.repository';
import { CreateUserDto } from './dto/createUser-dto';
import { AuthUser } from './models/auth_user';

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

  async signupWithGoogle(token: string): Promise<AuthUser> {
    console.log('token', token);
    const userInfo = await this.getUserData(token);

    if (!userInfo.verified_email) {
      throw new HttpException('Invalid email', 403);
    }

    console.log(userInfo);
    const userData = {
      username: userInfo.name,
      email: userInfo.email,
      auth_with_google: true,
    };

    const user = this.repository.signupWithGoogle(userData);

    return user;
  }

  async signup(data: CreateUserDto): Promise<AuthUser> {
    const user = await this.repository.signupWithGoogle(data);
    return user;
  }

  async authenticateWithGoogle(token: string): Promise<AuthUser> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    if (!tokenInfo.email_verified) {
      throw new HttpException('Invalid email', 403);
    }

    const email = tokenInfo.email;

    const user = await this.repository.authenticateWithGoogle({ email });

    return user;
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

  private jwtToken(auth: AuthUser): Promise<string> {
    const payload = { username: auth.username, sub: auth.id };
    return this.jwtService.signAsync(payload);
  }
}
