import { Joi } from "express-validation";
import * as validSchema from "./index.validationSchema.js";

export const registerSchema = {
  body: Joi.object({
    email: validSchema.emailValidationSchema,
    name: validSchema.stringMinTwoSymbolSchema,
    password: validSchema.passwordValidationSchema,
    confirmPassword: validSchema.passwordValidationSchema
  })
};
