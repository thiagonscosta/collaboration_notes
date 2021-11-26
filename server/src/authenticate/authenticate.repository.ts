import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthUser } from './models/auth_user';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async signupWithGoogle(json): Promise<AuthUser> {
    const sql = `select * from user_signup(fv_jsonb => $1::jsonb)`;

    const rows = await this.db.executeQuery(sql, [json]);

    return rows[0].payload;
  }

  async authenticateWithGoogle(json): Promise<AuthUser> {
    const sql = `select * from user_authenticate_with_google(fv_jsonb => $1::jsonb) payload`;

    const rows = await this.db.executeQuery(sql, [json]);

    return rows[0].payload;
  }
}