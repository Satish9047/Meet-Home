import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from './routes/index';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(morgan('tiny'));

app.use('/api/v1', router);

app.use(errorHandler);

export default app;
