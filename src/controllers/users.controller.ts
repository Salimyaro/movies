import { User } from "../db/User.js";
import { ControllerFunction } from "../interfaces/index.js";
import { CreateUserBody } from "../interfaces/users.js";
import jwt from "jsonwebtoken";
import { getHashPassword } from "../helpers/password.js";

export const create: ControllerFunction = async (req, res) => {
  try {
    const { email, name, password, confirmPassword }: CreateUserBody = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            confirmPassword: "NOT_SAME",
            password: "NOT_SAME"
          },
          code: "NOT_SAME"
        }
      });
    }
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
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something wrong, please repeat request",
      error
    });
  }
};
