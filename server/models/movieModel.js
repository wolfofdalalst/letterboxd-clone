import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    watched: Boolean,
    liked: Boolean,
    watchlist: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
