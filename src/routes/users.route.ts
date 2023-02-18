import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";

const userRouter: Router = Router();

/* POST requests */
userRouter.post("/", usersController.create);

export default userRouter;
