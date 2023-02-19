import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import Sequelize from "sequelize";
import ApiError from "../helpers/customErrors.js";

export const errorMiddleware = (
  error: ApiError | ValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error("Error:", error);

  if (error instanceof ValidationError) {
    return res.status(400).json({
      status: 0,
      message: "Validation error.",
      validationDetails: error.details
    });
  }

  if (
    error instanceof Sequelize.ValidationError ||
    error instanceof Sequelize.UniqueConstraintError
  ) {
    return res.status(400).json({
      status: 0,
      message: "Validation error.",
      errors:
        error.errors.map(({ message, type, path }: any) => ({
          message,
          type,
          path
        })) || "Unhandled error."
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.status).json({
      status: 0,
      message: error.message || "Unhandled error."
    });
  }

  return res.status(500).json({ status: 0, message: "Unhandled error." });
};
