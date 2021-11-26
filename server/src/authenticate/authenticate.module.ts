import { Module } from '@nestjs/common';
import { AuthenticateResolver } from './authenticate.resolver';
import { AuthenticateRepository } from './authenticate.repository';
import { AuthenticateService } from './authenticate.service';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.APP_JWT_SECRET,
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [
    AuthenticateService,
    AuthenticateResolver,
    AuthenticateRepository,
  ],
})
export class AuthenticateModule {}
