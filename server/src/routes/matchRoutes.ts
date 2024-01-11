import { Router } from "express";
import matchController from "../controllers/matchController";
import authController from "../controllers/authController";


const matchRouter = Router();

matchRouter.route("/today")
            .get(matchController.getTodayMatches)

matchRouter.route("/")
            .get(authController.protect, matchController.getAllMatches)
            .post(authController.protect, authController.restrictTo('admin'), matchController.createMatch)

matchRouter.route("/:id")
            .get(matchController.getMatch)
            .patch(authController.protect, authController.restrictTo('admin'), matchController.updateMatch)
            .delete(authController.protect, authController.restrictTo('admin'), matchController.deleteMatch)


export default matchRouter;
