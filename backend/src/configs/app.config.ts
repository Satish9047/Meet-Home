import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/auth',
  SALT_ROUND: Number(process.env.SALT_ROUND) || 10,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || 'jwt-token-secret-satish',
  JWT_EXIPRES_IN: process.env.JWT_EXIPRES_IN || '10s',
  COOKIE_EXPIRES_IN: Number(process.env.COOKIE_EXPIRES_IN) || 1000 * 60 * 60,
};

export default config;
