import { Module } from '@nestjs/common';
import { AuthenticateResolver } from './authenticate.resolver';
import { AuthenticateRepository } from './authenticate.repository';
import { AuthenticateService } from './authenticate.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
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
    JwtStrategy
  ],
})
export class AuthenticateModule {}
