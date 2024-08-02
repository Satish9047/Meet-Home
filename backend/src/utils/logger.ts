import pino from 'pino';
// import path from 'path';

// const logPath = path.join(__dirname, '..', 'logs', 'app.log');
/**
 * @description   Logger configuration
 */
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      // destination: logPath,
      // mkdir: true,
      colorize: true,
    },
  },
});

export default logger;
