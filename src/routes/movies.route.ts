import { Router } from "express";
import * as moviesController from "../controllers/movies.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

const userRouter: Router = Router();

/* GET requests */
userRouter.get("/:movieId", checkAuth, moviesController.getMovie);
userRouter.get("/", checkAuth, moviesController.getList);

/* POST requests */
userRouter.post("/", checkAuth, moviesController.createMovie);
userRouter.post("/import", checkAuth, moviesController.importMovies);

/* PUT requests */
userRouter.put("/:movieId", checkAuth, moviesController.updateMovie);

/* DELETE requests */
userRouter.delete("/:movieId", checkAuth, moviesController.deleteMovie);

export default userRouter;
