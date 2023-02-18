import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/User.js";

type CheckAuth = (req: Request, res: Response, next: NextFunction) => void;

export const checkAuth: CheckAuth = async (req, res, next) => {
  try {
    const auth: string = req.headers.authorization || "Bearer ";
    const token: string = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, "some-jwt-secret");
    const result = await User.findOne({
      where: { email: decoded.email, id: decoded.id }
    });
    if (!result) {
      return res.status(401).json({
        status: 0,
        error: {
          fields: {
            token: "JWT_NOT_VALID"
          },
          code: "JWT_ERROR"
        }
      });
    }
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