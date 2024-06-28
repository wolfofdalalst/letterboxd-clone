import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './config.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import movieRouter from './routes/movieRoute.js';

connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/movie', movieRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server starting at port ${port}`));
