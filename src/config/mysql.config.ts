import 'dotenv/config';
import mysql, { Pool } from 'mysql2/promise';
import { IDatabaseClient } from '../interfaces';
import { logger } from '../utils';

export class MySQLDatabaseClient implements IDatabaseClient {
  private static instance: MySQLDatabaseClient;
  private pool: Pool;

  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
    });
  }

  static getInstance(): MySQLDatabaseClient {
    if (!MySQLDatabaseClient.instance) {
      MySQLDatabaseClient.instance = new MySQLDatabaseClient();
    }
    return MySQLDatabaseClient.instance;
  }

  getPool(): Pool {
    return this.pool;
  }

  async connect(): Promise<void> {
    try {
      const connection = await this.pool.getConnection();
      connection.release();
      logger.info('MySQL database connected successfully! ✅');
    } catch (error) {
      logger.error(`MySQL database connection failed - ${error} ❌`);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      logger.info('MySQL database disconnected successfully! ❌');
    } catch (error) {
      logger.error(`MySQL database disconnection failed - ${error} ❌`);
    }
  }
}

export const mysqlClient = MySQLDatabaseClient.getInstance();
