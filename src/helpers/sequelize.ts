import { FindOptions, Op } from "sequelize";
import { Actor } from "../db/Movie.js";
import { GetMoviesQuery } from "../interfaces/movies.js";

export const getWhere = (query: GetMoviesQuery): FindOptions => {
  const { actor, title } = query;
  let findOptions: FindOptions = {};
  if (title) {
    findOptions = {
      ...findOptions,
      where: {
        title: { [Op.substring]: title }
      }
    };
  }
  if (actor) {
    findOptions = {
      ...findOptions,
      include: {
        model: Actor,
        through: {
          attributes: []
        },
        where: {
          name: { [Op.substring]: actor }
        }
      }
    };
  }

  return findOptions;
};

export const getOrder = (query: GetMoviesQuery): FindOptions => {
  const { sort = "title", order = "ASC" } = query;
  return {
    order: [[sort, order]]
  };
};

export const getPagination = (query: GetMoviesQuery): FindOptions => {
  const { limit, offset } = query;
  return limit
    ? {
        limit: Number(limit),
        offset: Number(offset || 0)
      }
    : {
        subQuery: false
      };
};
