import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Pool } from 'pg';
import { DATABASE_POOL } from 'src/constants';
import { DatabaseService } from './database.service';
import * as dotenv from 'dotenv';

dotenv.config();

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: process.env.DB_USER, // configService.get('DB_USER'),
    host: process.env.DB_HOST, // configService.get('DB_HOST'),
    database: process.env.DB_DATABASE, // configService.get('DB_DATABASE'),
    password: process.env.DB_PASSWORD, // configService.get('DB_PASSWORD'),
    port: Number(process.env.DB_PORT), // configService.get('DB_PORT'),
  });
};

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
    return pool.end();
  }
}
