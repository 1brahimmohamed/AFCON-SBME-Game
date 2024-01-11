import authController from "../controllers/authController";
import { Router } from "express";

const authRouter = Router();

authRouter.route("/signup")
    .post(authController.signup);

authRouter.route("/login")
    .post(authController.login);


export default authRouter;