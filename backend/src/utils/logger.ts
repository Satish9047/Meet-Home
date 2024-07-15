import pino from 'pino';
import path from 'path';

const logPath = path.join(__dirname, 'app.log');
const logger = pino({
  transport: {
    target: 'pino/file',
    options: {
      destination: logPath,
      mkdir: true,
      colorize: true,
    },
  },
});

export default logger;
