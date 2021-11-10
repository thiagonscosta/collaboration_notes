import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthenticateRepository {
  constructor(private readonly db: DatabaseService) {}

  async authenticateWithGoogle(json) {

    console.log(json)
    // const data = JSON.stringify(jsonb);

    const sql = `select * from user_authenticate_with_google(fv_jsonb => $1::jsonb)`;

    const result = await this.db.executeQuery(sql, [json]);

    // console.log(result);
  }
}
