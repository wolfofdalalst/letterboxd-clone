import mongoose from 'mongoose';

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

const apiRequestConfig = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
};

const urlIndex = {
    tmdb: 'https://api.themoviedb.org/3',
    tmdbImage: 'https://image.tmdb.org/t/p/original',
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  }
};

export { urlIndex, apiRequestConfig, connectDB };
