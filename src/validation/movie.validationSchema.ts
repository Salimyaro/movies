import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const movieId = {
  movieId: validSchema.numberGreaterZeroSchema
};
export const getMovie = {
  params: Joi.object(movieId)
};

export const getList = {
  query: Joi.object({
    actor: validSchema.optionalStringMinTwoSymbolSchema,
    title: validSchema.optionalStringMinTwoSymbolSchema,
    sort: validSchema.movieSortValidationSchema,
    order: validSchema.orderValidationSchema,
    limit: validSchema.optionalNumberGreaterZeroSchema,
    offset: validSchema.optionalNumberSchema
  })
};

export const createMovie = {
  title: validSchema.stringMinTwoSymbolSchema,
  year: validSchema.numberSchema,
  format: validSchema.formatValidationSchema,
  actors: Joi.array().items(validSchema.stringMinTwoSymbolSchema)
};

export const createReqMovie = {
  body: Joi.object(createMovie)
};

export const updateMovie = {
  params: Joi.object(movieId),
  body: Joi.object({
    title: validSchema.stringMinTwoSymbolSchema,
    year: validSchema.numberSchema,
    format: validSchema.formatValidationSchema,
    actors: Joi.array().items(validSchema.stringMinTwoSymbolSchema)
  })
};

export const deleteMovie = {
  params: Joi.object(movieId)
};

export const importMovies = {
  body: Joi.object({
    filepath: Joi.string().required(),
    mimetype: Joi.string().valid("text/plain").required()
  })
};
