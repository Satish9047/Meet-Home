import express from 'express';
import cors from 'cors';
import router from './routes/index';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
