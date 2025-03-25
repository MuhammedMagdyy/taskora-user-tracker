import 'dotenv/config';
import { createClient, RedisClientType } from 'redis';
import { IDatabaseClient } from '../interfaces';
import { logger } from '../utils';

export class RedisDatabaseClient implements IDatabaseClient {
  private static instance: RedisDatabaseClient;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({ url: process.env.REDIS_URL });
  }

  static getInstance(): RedisDatabaseClient {
    if (!RedisDatabaseClient.instance) {
      RedisDatabaseClient.instance = new RedisDatabaseClient();
    }

    return RedisDatabaseClient.instance;
  }

  getClient() {
    return this.client;
  }

  async connect(): Promise<void> {
    try {
      await this.getClient().connect();
      logger.info(`Redis database connected successfully! ✅`);
    } catch (error) {
      logger.error(`Redis database connection failed - ${error} ❌`);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.getClient().disconnect();
      logger.info(`Redis database disconnected successfully! ❌`);
    } catch (error) {
      logger.error(`Redis database disconnection failed - ${error} ❌`);
    }
  }
}

export const redisClient = RedisDatabaseClient.getInstance();
