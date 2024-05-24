import { Router } from "express"
import { createMovie, listMovies } from "../controller/movieController.js";
import protect from "../middleware/authMiddleware.js";

const movieRouter = Router();

movieRouter.route("/")
    .get(protect, listMovies)
    .post(protect, createMovie);

export default movieRouter;