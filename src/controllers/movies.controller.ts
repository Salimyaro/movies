import { ControllerFunction } from "../interfaces/index.js";
import * as movieService from "../services/movie.service.js";
import formidable from "formidable";
import fs from "fs";
import ApiError from "../helpers/customErrors.js";

export const createMovie: ControllerFunction = async (req, res, next) => {
  try {
    const exist = await movieService.findMovieByTitle(req.body.title);
    if (exist)
      throw ApiError.BadRequest(`Movie '${req.body.title}' already exists`);

    const result = await movieService.createMovie(req.body);

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const importMovies: ControllerFunction = async (req, res, next) => {
  try {
    const { filepath } = req.body;

    fs.readFile(filepath, "utf8", async (err, data) => {
      if (err) {
        return next(err);
      }
      const pending = [];
      let imports = 0;

      const filmsArray = data.split(/\n\s*\n/);

      for (const film of filmsArray) {
        const filmLines = film.split("\n");
        if (filmLines.length !== 4) continue;

        imports += 1;
        const title = filmLines[0].split(": ")[1];
        const movieExist = await movieService.findMovieByTitle(title);
        if (movieExist) continue;

        const year = Number(filmLines[1].split(": ")[1]);
        const format = filmLines[2].split(": ")[1];
        const actors = filmLines[3].split(": ")[1].split(", ");
        const movie = await movieService.createMovie({
          title,
          year,
          format,
          actors
        });
        pending.push(movie);
      }

      const result = await Promise.all(pending);
      return res.status(200).json({
        status: 1,
        meta: {
          imported: imports,
          created: result.length
        },
        data: result
      });
    });
  } catch (error) {
    next(error);
  }
};

export const getMovie: ControllerFunction = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const result = await movieService.findMovieById(movieId);
    if (!result)
      throw ApiError.NotFoundError(`Movie with id: ${movieId} not found`);

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getList: ControllerFunction = async (req, res, next) => {
  try {
    const result = await movieService.findMovies(req.query);

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateMovie: ControllerFunction = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted)
      throw ApiError.NotFoundError(`Movie with id: ${movieId} not found`);

    const result = await movieService.createMovie({ ...req.body, id: movieId });

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie: ControllerFunction = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted)
      throw ApiError.NotFoundError(`Movie with id: ${movieId} not found`);

    return res.status(204).json({
      status: 1
    });
  } catch (error) {
    next(error);
  }
};
