import { ControllerFunction } from "../interfaces/index.js";
import * as movieService from "../services/movie.service.js";
import formidable from "formidable";
import fs from "fs";

export const createMovie: ControllerFunction = async (req, res) => {
  try {
    const exist = await movieService.findMovieByTitle(req.body.title);
    if (exist) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            title: req.body.title
          },
          code: "MOVIE_EXISTS"
        }
      });
    }

    const result = await movieService.createMovie(req.body);

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};

export const importMovies: ControllerFunction = async (req, res, next) => {
  try {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const filePath =
        files.movies instanceof Array
          ? files.movies[0]?.filepath
          : files.movies?.filepath;

      if (!filePath) {
        return res.status(400).json({
          status: 0,
          error: {
            fields: {
              movies: "NO_FILE"
            },
            code: "MOVIE_EXISTS"
          }
        });
      }

      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          next(err);
          return;
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
    });
  } catch (error) {
    console.log(error);
    console.log("!!!!!!!!!!!! exit");
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};

export const getMovie: ControllerFunction = async (req, res) => {
  try {
    const { movieId } = req.params;

    const result = await movieService.findMovieById(movieId);
    if (!result) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            id: movieId
          },
          code: "MOVIE_NOT_FOUND"
        }
      });
    }

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};

export const getList: ControllerFunction = async (req, res) => {
  try {
    const result = await movieService.findMovies(req.query);

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};

export const updateMovie: ControllerFunction = async (req, res) => {
  try {
    const { movieId } = req.params;

    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            id: movieId
          },
          code: "MOVIE_NOT_FOUND"
        }
      });
    }

    const result = await movieService.createMovie({ ...req.body, id: movieId });

    return res.status(200).json({
      status: 1,
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};

export const deleteMovie: ControllerFunction = async (req, res) => {
  try {
    const { movieId } = req.params;

    const deleted = await movieService.deleteMovieById(movieId);
    if (!deleted) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            id: movieId
          },
          code: "MOVIE_NOT_FOUND"
        }
      });
    }

    return res.status(204).json({
      status: 1
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};
