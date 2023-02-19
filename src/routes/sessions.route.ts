import { Router } from "express";
import { validate } from "express-validation";
import * as sessionsController from "../controllers/sessions.controller.js";
import * as sessionValidSchema from "../validation/session.validationSchema.js";

const userRouter: Router = Router();

/* POST requests */
userRouter.post(
  "/",
  validate(sessionValidSchema.loginSchema),
  sessionsController.create
);

export default userRouter;
