import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const loginSchema = {
  email: validSchema.emailValidationSchema,
  password: validSchema.passwordValidationSchema
};

export const loginReqSchema = {
  body: Joi.object(loginSchema)
};
