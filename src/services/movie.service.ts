import { Actor, Movie } from "../db/Movie.js";
import { getOrder, getPagination, getWhere } from "../helpers/sequelize.js";
import {
  CreateMovieBody,
  CreateMovieReqBody,
  GetMoviesQuery
} from "../interfaces/movies.js";

export const findMovieById = async (id: number): Promise<Movie | null> => {
  return await Movie.findOne({
    where: { id },
    include: {
      model: Actor,
      through: {
        attributes: []
      }
    }
  });
};

export const findMovieByTitle = async (
  title: string
): Promise<Movie | null> => {
  return await Movie.findOne({
    where: { title }
  });
};

export const findMovies = async (
  query: GetMoviesQuery
): Promise<{
  rows: Movie[];
  count: number;
}> => {
  return await Movie.findAndCountAll({
    ...getWhere(query),
    ...getPagination(query),
    ...getOrder(query)
  });
};

export const deleteMovieById = async (id: number): Promise<number> => {
  return await Movie.destroy({ where: { id } });
};

export const createMovie = async (
  newMovie: CreateMovieReqBody & { id?: number }
): Promise<Movie | null> => {
  const { title, year, format, actors }: CreateMovieReqBody = newMovie;
  const movieBody: CreateMovieBody = { title, year, format };
  if (newMovie.id) movieBody.id = newMovie.id;
  const movie: any = await Movie.create(movieBody);

  const pending = actors.map(async (name) => {
    const actor = await Actor.findCreateFind({ where: { name } });
    await movie.addActor(actor[0]);
  });
  await Promise.all(pending);

  return await findMovieById(movie.dataValues.id);
};
