import { User } from "../db/User.js";
import { ControllerFunction } from "../interfaces/index.js";
import { CreateSessionBody } from "../interfaces/sessions.js";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../helpers/password.js";

export const create: ControllerFunction = async (req, res) => {
  try {
    const { email, password }: CreateSessionBody = req.body;
    const result = await User.findOne({ where: { email } });

    if (
      !result ||
      !verifyPassword({
        candidatePassword: password,
        hash: result.dataValues.password
      })
    ) {
      return res.status(400).json({
        status: 0,
        error: {
          fields: {
            email: "AUTHENTICATION_FAILED",
            password: "AUTHENTICATION_FAILED"
          },
          code: "AUTHENTICATION_FAILED"
        }
      });
    }

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
