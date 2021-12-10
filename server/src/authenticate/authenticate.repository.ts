import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './models/user';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async signupWithGoogle(json): Promise<User> {
    const sql = `select * from user_signup(fv_jsonb => $1::jsonb)`;

    const rows = await this.db.executeQuery(sql, [json]);

    return rows[0].payload;
  }

  async authenticateWithGoogle(json): Promise<User> {
    const sql = `select * from user_authenticate_with_google(fv_jsonb => $1::jsonb) payload`;

    const rows = await this.db.executeQuery(sql, [json]);

    return rows[0].payload;
  }

  async findUserById(id: string): Promise<User> {
    const sql = `select * from user_find_by_id(fv_id => $1::uuid) payload`;

    const rows = await this.db.executeQuery(sql, [id]);

    return rows[0].payload;
  }
}