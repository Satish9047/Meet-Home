import config from '../configs/app.config';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${config.MONGO_URL}/meet-home`);
    console.log('MongoDb Connect successfull: ', connection.connection.host);
  } catch (error) {
    console.log('mongoDB error: ', error);
    process.exit(1);
  }
};

export default connectDB;
