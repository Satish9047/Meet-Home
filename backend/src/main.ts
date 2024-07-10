import config from './configs/app.config';
import connectDB from './db/mongo';
import app from './app';

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
    app.on('error', (error) => {
      console.log('Error: ', error);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error);
  });
