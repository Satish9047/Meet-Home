import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/auth',
};

export default config;
