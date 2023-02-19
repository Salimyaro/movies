import { NextFunction, Request, Response } from "express";

export type ControllerFunction<ReqBody = any> = (
  req: Request<any, any, ReqBody>,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

export type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type JWTData = {
  email: string;
  id: string | number;
};
