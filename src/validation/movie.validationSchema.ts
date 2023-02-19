import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const getMovie = {
  params: Joi.object({
    movieId: validSchema.numberGreaterZeroSchema
  })
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
  body: Joi.object({
    title: validSchema.stringMinTwoSymbolSchema,
    year: validSchema.numberSchema,
    format: validSchema.formatValidationSchema,
    actors: Joi.array().items(validSchema.stringMinTwoSymbolSchema)
  })
};

export const updateMovie = {
  params: Joi.object({
    movieId: validSchema.numberGreaterZeroSchema
  }),
  body: Joi.object({
    title: validSchema.stringMinTwoSymbolSchema,
    year: validSchema.numberSchema,
    format: validSchema.formatValidationSchema,
    actors: Joi.array().items(validSchema.stringMinTwoSymbolSchema)
  })
};

export const deleteMovie = {
  params: Joi.object({
    movieId: validSchema.numberGreaterZeroSchema
  })
};

export const importMovies = {
  body: Joi.object({
    movies: validSchema.fileValidationSchema
  })
};
