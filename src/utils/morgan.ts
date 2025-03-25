import morgan from 'morgan';

export const httpRequestLogger =
  process.env.NODE_ENV === 'development'
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < 500,
      });
