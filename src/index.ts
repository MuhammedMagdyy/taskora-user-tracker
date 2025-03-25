import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { httpRequestLogger, logger } from './utils';

const app = express();
const port = process.env.PORT || 3000;

app.use(httpRequestLogger);
app.use(helmet());
app.get('/', (_req, res) => {
  res.send(
    '<div style="text-align: center; margin-top: 20px;"><h1>Welcome to Taskora User Tracker 🚀</h1></div>',
  );
});

app.listen(port, () => {
  logger.info(`Server is running on ${port}`);
});
