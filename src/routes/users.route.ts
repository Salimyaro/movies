import { Router } from "express";
import { validate } from "express-validation";
import * as usersController from "../controllers/users.controller.js";
import * as userValidSchema from "../validation/users.validationSchema.js";

const userRouter: Router = Router();

/* POST requests */
userRouter.post(
  "/",
  validate(userValidSchema.registerReqSchema),
  usersController.create
);

export default userRouter;
