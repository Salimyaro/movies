import { Router } from "express";
import * as sessionsController from "../controllers/sessions.controller.js";

const userRouter: Router = Router();

/* POST requests */
userRouter.post("/", sessionsController.create);

export default userRouter;
