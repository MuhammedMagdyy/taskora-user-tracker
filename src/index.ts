import 'dotenv/config';
import cron from 'node-cron';
import { mysqlClient, redisClient } from './config';
import { userService } from './services';
import { logger } from './utils';

(async () => {
  try {
    Promise.all([await mysqlClient.connect(), await redisClient.connect()]);

    logger.info('Starting user monitoring cron job... ✅');

    cron.schedule('0 * * * *', () => {
      logger.info('Running user check... 🔍');
      userService.checkForNewUsers().catch((error) => {
        logger.error(`Error during user check: ${error}`);
      });
    });

    logger.info('Cron job scheduled to run every hour ✅');

    const shutdown = async () => {
      logger.info('Shutting down gracefully... ⏳');
      await mysqlClient.disconnect();
      await redisClient.disconnect();
      logger.info('All connections closed. Bye! 👋');
      process.exit(0);
    };

    process.on('SIGINT', () => {
      shutdown().catch((err) => logger.error(`Error during shutdown: ${err}`));
    });
  } catch (error) {
    logger.error(`Error during startup: ${error}`);
    process.exit(1);
  }
})();
