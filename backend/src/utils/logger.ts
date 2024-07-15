import pino from 'pino';

const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    level: 'info',
  },
  pino.destination('../lib/logs/app.log'),
);

export default logger;
