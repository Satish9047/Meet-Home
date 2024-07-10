import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);
const config = {
  port: Number(process.env.PORT) || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/auth',
};

export default config;