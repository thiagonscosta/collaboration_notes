import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async authenticateWithGoogle(json) {
    const sql = `select * from user_authenticate_with_google(fv_jsonb => $1::jsonb)`;

    return await this.db.executeQuery(sql, [json]);
  }

  async signupWithGoogle(json) {
    const sql = `select * from user_authenticate_with_google(fv_jsonb => $1::jsonb)`;

    return await this.db.executeQuery(sql, [json]);
  }
}