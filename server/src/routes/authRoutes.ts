import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.route("/signup")
    .post(authController.signup);

authRouter.route("/login")
    .post(authController.login);

authRouter.route("/forgot-password")
    .post(authController.forgotPassword);

authRouter.route("/reset-password/:token")
    .patch(authController.resetPassword);

authRouter.route("/check-reset-token/:token")
    .get(authController.checkIfResetTokenExists);

export default authRouter;
