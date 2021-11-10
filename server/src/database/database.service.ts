import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { DATABASE_POOL } from 'src/constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DATABASE_POOL) private pool: Pool) {}

  executeQuery(queryText: string, values: any = []): Promise<any[]> {
    console.log(queryText, values);
    return this.pool.query(queryText, values).then((result: QueryResult) => {
      return result.rows;
    });
  }
}
