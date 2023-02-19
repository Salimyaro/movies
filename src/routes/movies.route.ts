import { Router } from "express";
import { validate } from "express-validation";
import { checkAuth } from "../middleware/checkAuth.js";
import * as moviesController from "../controllers/movies.controller.js";
import * as movieValidSchema from "../validation/movie.validationSchema.js";

const userRouter: Router = Router();

/* GET requests */
userRouter.get(
  "/:movieId",
  checkAuth,
  validate(movieValidSchema.getMovie),
  moviesController.getMovie
);
userRouter.get(
  "/",
  checkAuth,
  validate(movieValidSchema.getList),
  moviesController.getList
);

/* POST requests */
userRouter.post(
  "/",
  checkAuth,
  validate(movieValidSchema.createMovie),
  moviesController.createMovie
);
userRouter.post(
  "/import",
  checkAuth,
  validate(movieValidSchema.importMovies),
  moviesController.importMovies
);

/* PUT requests */
userRouter.put(
  "/:movieId",
  checkAuth,
  validate(movieValidSchema.updateMovie),
  moviesController.updateMovie
);

/* DELETE requests */
userRouter.delete(
  "/:movieId",
  checkAuth,
  validate(movieValidSchema.deleteMovie),
  moviesController.deleteMovie
);

export default userRouter;
