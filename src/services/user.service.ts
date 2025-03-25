import { RowDataPacket } from 'mysql2';
import {
  mysqlClient,
  MySQLDatabaseClient,
  redisClient,
  RedisDatabaseClient,
} from '../config';
import { logger } from '../utils';
import { emailService, EmailService } from './email.service';

export class UserService {
  constructor(
    private readonly mysqlClient: MySQLDatabaseClient,
    private readonly redisClient: RedisDatabaseClient,
    private readonly emailService: EmailService,
  ) {
    this.emailService = new EmailService();
  }

  getUsersCount = async () => {
    const query = `SELECT COUNT(u.uuid) AS taskora_users FROM ${process.env.MYSQL_DATABASE_NAME}.users u;`;

    try {
      const [rows] = await this.mysqlClient
        .getPool()
        .execute<RowDataPacket[]>(query);
      logger.info(`Query executed successfully: ${query}`);
      return (rows as { taskora_users: number }[])[0].taskora_users;
    } catch (error) {
      logger.error(`Error executing query: ${error}`);
      throw new Error('Database query failed');
    }
  };

  getLastUserCount = async () => {
    const key = 'last_user_count';
    try {
      const lastCount = await this.redisClient.getClient().get(key);
      if (lastCount) {
        logger.info(`Last users count retrieved from Redis: ${lastCount}`);
        return Number(lastCount) || 0;
      } else {
        logger.info('No last users count found in Redis, defaulting to 0');
        return 0;
      }
    } catch (error) {
      logger.error(`Failed to fetch last users count from Redis: ${error}`);
      throw new Error(`Failed to fetch last users count from Redis - ${error}`);
    }
  };

  updateUserCount = async (count: number) => {
    const key = 'last_user_count';
    try {
      await this.redisClient.getClient().set(key, count.toString());
      logger.info(`Updated last users count in Redis: ${count}`);
    } catch (error) {
      logger.error(`Failed to update last users count in Redis: ${error}`);
      throw new Error(`Failed to update last users count in Redis - ${error}`);
    }
  };

  checkForNewUsers = async () => {
    try {
      const currentCount = await this.getUsersCount();
      const lastCount = await this.getLastUserCount();

      logger.info(`Current users count: ${currentCount}`);

      if (currentCount > lastCount) {
        const newUsers = currentCount - lastCount;
        logger.info(`🎉 New user(s) detected! (${newUsers} added)`);

        try {
          this.emailService.sendFancyEmail({
            newUsers,
            totalUsers: currentCount,
          });
        } catch (emailError) {
          logger.error(`Failed to send email: ${emailError}`);
        }

        await userService.updateUserCount(currentCount);
      } else {
        logger.info('No new users 🥲');
      }
    } catch (error) {
      logger.error(`Error during user check: ${error}`);
    }
  };
}

export const userService = new UserService(
  mysqlClient,
  redisClient,
  emailService,
);
