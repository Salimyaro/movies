import { User } from "../db/User.js";
import { ControllerFunction } from "../interfaces/index.js";
import { CreateSessionBody } from "../interfaces/sessions.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../helpers/password.js";
import ApiError from "../helpers/customErrors.js";

export const create: ControllerFunction = async (req, res, next) => {
  try {
    const { email, password }: CreateSessionBody = req.body;
    const result = await User.findOne({ where: { email } });

    if (
      !result ||
      !verifyPassword({
        candidatePassword: password,
        hash: result.dataValues.password
      })
    )
      throw ApiError.UnauthorizedError("Not valid email or password");

    const token = jwt.sign(
      { id: result.dataValues.id, email: result.dataValues.email },
      "some-jwt-secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      status: 1
    });
  } catch (error) {
    next(error);
  }
};
