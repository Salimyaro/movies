import { User } from "../db/User.js";
import { ControllerFunction } from "../interfaces/index.js";
import { CreateUserBody } from "../interfaces/users.js";
import jwt from "jsonwebtoken";
import { getHashPassword } from "../helpers/password.js";
import ApiError from "../helpers/customErrors.js";

export const create: ControllerFunction = async (req, res, next) => {
  try {
    const { email, name, password, confirmPassword }: CreateUserBody = req.body;

    if (password !== confirmPassword)
      throw ApiError.BadRequest(
        "password and confirmPassword must be the same"
      );

    const result = await User.create({
      email,
      name,
      password: getHashPassword(password)
    });

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
