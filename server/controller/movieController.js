import expressAsyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";

const createMovie = expressAsyncHandler(async(req, res) => {
    const userId = req.user._id;

    const { movieId, rating, summary } = req.body

    const movieExists = await Movie.findOne({ movieId });

    if (movieExists) {
        res.status(400);
        throw new Error("Movie already exists");
    }

    const movie = await Movie.create({
        movieId: movieId,
        rating: rating,
        summary: summary,
        user: userId,
    });

    if (movie) {
        // TODO: change this in the future
        res.send(movie);
    } else {
        res.status(400);
        throw new Error("Incorrect movie field inputs");
    }
});

// TODO: format the response
const listMovies = expressAsyncHandler(async(req, res) => {
    const movies = await Movie.find({ user: req.user._id });

    res.send(movies);
});

// TODO: implement update and delete operation

export { createMovie, listMovies };