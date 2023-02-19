import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const registerSchema = {
  email: validSchema.emailValidationSchema,
  name: validSchema.stringMinTwoSymbolSchema,
  password: validSchema.passwordValidationSchema,
  confirmPassword: validSchema.passwordValidationSchema
};

export const registerReqSchema = {
  body: Joi.object(registerSchema)
};
