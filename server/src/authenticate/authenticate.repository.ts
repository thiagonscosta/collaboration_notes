import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async authenticateWithGoogle(jsonb) {
    const sql = `select * from user_authenticate_with_google(fv_jsonb => :jsonb)`;

    const result = this.db.executeQuery(sql, [jsonb]);

    console.log(result);
  }
}
