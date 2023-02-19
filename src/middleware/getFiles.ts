import formidable from "formidable";
import { ExpressFunction } from "../interfaces/index.js";

export const getMovieFile: ExpressFunction = async (req, res, next) => {
  try {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return next(err);
      }

      const filepath =
        files.movies instanceof Array
          ? files.movies[0]?.filepath
          : files.movies?.filepath;

      const mimetype =
        files.movies instanceof Array
          ? files.movies[0]?.mimetype
          : files.movies?.mimetype;

      req.body = { filepath, mimetype };
      next();
    });
  } catch (error) {
    next(error);
  }
};
