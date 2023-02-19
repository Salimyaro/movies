import jwt from "jsonwebtoken";
import { User } from "../db/User.js";
import ApiError from "../helpers/customErrors.js";
import { ExpressFunction } from "../interfaces/index.js";

export const checkAuth: ExpressFunction = async (req, res, next) => {
  try {
    const auth: string = req.headers.authorization || "Bearer ";
    const token: string = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, "some-jwt-secret");
    const result = await User.findOne({
      where: { email: decoded.email, id: decoded.id }
    });
    if (!result) throw ApiError.UnauthorizedError("JWT_NOT_VALID");
    next();
  } catch (error) {
    console.dir(error);
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        status: 0,
        error: {
          fields: {
            token: "JWT_NOT_VALID"
          },
          code: "JWT_ERROR"
        }
      });

    return res.status(401).json({
      status: 0,
      error: {
        fields: {
          token: "REQUIRED"
        },
        code: "JWT_ERROR"
      }
    });
  }
};
