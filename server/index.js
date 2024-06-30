import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import { connectDB } from './config.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import movieRouter from './routes/movieRoute.js';
import userRouter from './routes/userRoute.js';

connectDB();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
