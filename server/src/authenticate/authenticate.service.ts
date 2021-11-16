import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { AuthenticateRepository } from './authenticate.repository';
import { CreateUserDto } from './dto/createUser-dto';

@Injectable()
export class AuthenticateService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly repository: AuthenticateRepository,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async signup(data: CreateUserDto) {
    console.log(data);
  }

  async signupWithGoogle(token: string) {
    const userInfo = await this.getUserData(token);

    if (!userInfo.verified_email) {
      throw new HttpException('Invalid email', 403);
    }

    const userData = {
      username: userInfo.name,
      email: userInfo.email,
      authWithGoogle: true,
    };

    await this.repository.signupWithGoogle(userData);
  }

  async authenticateWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    if (!tokenInfo.email_verified) {
      throw new HttpException('Invalid email', 403);
    }

    const email = tokenInfo.email;

    return await this.repository.authenticateWithGoogle({ email });
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
}
