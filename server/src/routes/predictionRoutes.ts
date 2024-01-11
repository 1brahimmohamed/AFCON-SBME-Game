import { Router } from "express";
import predictionController from "../controllers/predictionController";
import authController from "../controllers/authController";


const predictionRouter = Router();

predictionRouter.route("/my-predictions")
    .get(authController.protect, predictionController.getMyPredictions)

predictionRouter.route("/match-predictions/:slug")
    .get(predictionController.getMatchPredictions)

predictionRouter.route("/")
    .get(authController.protect, authController.restrictTo('admin'), predictionController.getAllPredictions)

predictionRouter.route("/:id")
    .get(authController.protect, authController.restrictTo('admin'), predictionController.getPrediction)
    .delete(authController.protect, authController.restrictTo('admin'), predictionController.deletePrediction)


export default predictionRouter;
