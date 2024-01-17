import gameController from '../controllers/gameController';
import authController from '../controllers/authController';
import { Router } from 'express';

const gameRouter = Router();

gameRouter.route("/predict/:matchId")
    .post(authController.protect, gameController.predict);

gameRouter.route("/update-score/:matchId")
    .post(authController.protect, authController.restrictTo('admin'), gameController.updateScoreAfterMatch);

gameRouter.route("/leaderboard")
    .get(gameController.getLeaderboard);

gameRouter.route("/my-score")
    .get(authController.protect, gameController.getMyScore);

export default gameRouter;
