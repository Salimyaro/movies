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
    console.error(error);
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        status: 0,
        message: "JWT_NOT_VALID"
      });

    return res.status(401).json({
      status: 0,
      message: "JWT_REQUIRED"
    });
  }
};
