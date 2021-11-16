import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async signupWithGoogle(json) {
    console.log(json);
    const sql = `select * from user_signup(fv_jsonb => $1::jsonb)`;

    return await this.db.executeQuery(sql, [json]);
  }

  async authenticateWithGoogle(json) {
    console.log(json);
    const sql = `select * user_authenticate_with_google(fv_jsonb => $1::jsonb)`;

    return await this.db.executeQuery(sql, [json]);
  }
}