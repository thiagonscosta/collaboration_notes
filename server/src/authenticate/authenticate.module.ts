import { Module } from '@nestjs/common';
import { AuthenticateResolver } from './authenticate.resolver';
import { AuthenticateRepository } from './authenticate.repository';
import { AuthenticateService } from './authenticate.service';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthenticateService,
    AuthenticateResolver,
    AuthenticateRepository,
  ],
})
export class AuthenticateModule {}
