import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.route("/signup")
    .post(authController.signup);

authRouter.route("/login")
    .post(authController.login);

export default authRouter;
