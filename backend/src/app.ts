import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import router from './routes/index';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
