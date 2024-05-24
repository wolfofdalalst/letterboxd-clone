import express from "express";
import "dotenv/config";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import movieRouter from "./routes/movieRoute.js";

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server starting at port ${port}`));
