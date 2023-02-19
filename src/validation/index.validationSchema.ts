import { Joi } from "express-validation";

export enum Sort {
  ID = "id",
  TITLE = "title",
  YEAR = "year"
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

export enum Format {
  DVD = "DVD",
  VHS = "VHS",
  BLU_RAY = "Blu-ray"
}

/** Required */
export const emailValidationSchema = Joi.string().email().required();
export const stringMinTwoSymbolSchema = Joi.string().trim().min(2).required();
export const passwordValidationSchema = Joi.string()
  .trim()
  .min(4)
  .max(32)
  .required();
export const movieSortValidationSchema = Joi.valid(...Object.values(Sort));
export const orderValidationSchema = Joi.valid(...Object.values(Order));
export const formatValidationSchema = Joi.valid(...Object.values(Format));
export const fileValidationSchema = Joi.object({
  base64: Joi.string().base64().required(),
  contentType: stringMinTwoSymbolSchema
});
export const numberSchema = Joi.number().required();
export const numberGreaterZeroSchema = Joi.number().greater(0).required();

/** Optional */
export const optionalStringMinTwoSymbolSchema = Joi.string()
  .trim()
  .min(2)
  .optional();
export const optionalNumberGreaterZeroSchema = Joi.number()
  .greater(0)
  .optional();
export const optionalNumberSchema = Joi.number().optional();
