import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const loginSchema = {
  body: Joi.object({
    email: validSchema.emailValidationSchema,
    password: validSchema.passwordValidationSchema
  })
};
