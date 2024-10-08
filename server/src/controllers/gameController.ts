import Match from "../models/matchModel";
import User from "../models/userModel";
import Prediction from "../models/predictionModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utils/errorHandler";


export const predict = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const matchId = req.params.matchId;
    const {selectedTeam} = req.body;

    const match = await Match.findById(matchId);

    if (!match) {
        return next(new ErrorHandler('Match not found', 404));
    }

    // check if the match has already started
    if (match.startTime < new Date(Date.now())) {
        return next(new ErrorHandler('You can not predict this match, it has already started', 400));
    }

    // check if selected team is valid
    if (match.teamA !== selectedTeam && match.teamB !== selectedTeam && selectedTeam !== 'Draw') {
        return next(new ErrorHandler('Invalid selected team', 400));
    }

    const prediction = await Prediction.findOne({user: req.user._id, match: matchId});

    if (prediction) {
        return next(new ErrorHandler('You have already predicted this match', 400));
    }

    const newPrediction = await Prediction.create({
        user: req.user._id,
        match: matchId,
        predictedTeam: selectedTeam
    });

    res
        .status(201)
        .json({
            status: 'success',
            data: newPrediction
        });
});

export const updateScoreAfterMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const matchId = req.params.matchId;

    // get the match winner
    const match = await Match.findById(matchId)

    if (!match) {
        return next(new ErrorHandler('Match not found', 404));
    }

    // check if score has already been resolved\
    if (match.scoreResolved) {
        return next(new ErrorHandler('Score has already been resolved', 400));
    }

    // check if the match has started
    if (match.startTime > new Date(Date.now())) {
        return next(new ErrorHandler('You can not update the score for this match, it has not started yet', 400));
    }

    // check if the match has ended and there is a winner
    if (!match.winner) {
        return next(new ErrorHandler('You can not update the score for this match, it has no winner yet', 400));
    }

    const matchWinner = match.winner;

    // get all match predictions
    const matchPredictions = await Prediction.find({match: matchId});

   // calculate the bonus factor
    const bonusFactor = calculateBonus(matchPredictions, matchWinner);

    // for each prediction update the score for the user
    matchPredictions.forEach(async (prediction) => {

        const user = await User.findById(prediction.user);

        // get the selected team
        const selectedTeam = prediction.predictedTeam;

        // if the selected team is the same as the match winner
        // then update the score for the user
        if (selectedTeam === matchWinner) {
            const type = match.type;
            if (type === 'group') {
                user.score += (bonusFactor);
            } else if (type === 'round of 16') {
                user.score += (2 * bonusFactor);
            } else if (type === 'quarter-finals') {
                user.score += (3 * bonusFactor)
            } else if (type === 'semi-finals') {
                user.score += (4 * bonusFactor);
            } else if (type === 'finals') {
                user.score += (5 * bonusFactor);
            }
            await user.save();
        }
    });

    match.scoreResolved = true;
    await match.save();

    res
        .status(200)
        .json({
            status: 'success',
            message: 'Score updated successfully'
        })
});

export const getLeaderboard = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const users = await User.find({}).select({
        name: 1,
        score: 1,
        class: 1
    }).sort({score: -1});

    res
        .status(200)
        .json({
            status: 'success',
            data: users
        });

});

export const getMyScore = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        status: 'success',
        data: req.user.score
    });
});

const calculateBonus = (matchPredictions: any, winner: string) => {
    let bonusFactor = 1;

    if (matchPredictions.length === 0)
        return bonusFactor;

    // get the total number of winner predictions
    const winnerPredictions = matchPredictions.filter((prediction: any) => prediction.predictedTeam === winner);

    if (Math.round((winnerPredictions.length/ matchPredictions.length) * 100) <= 10) {
        bonusFactor = 3;
    }
    else if (Math.round((winnerPredictions.length/ matchPredictions.length) * 100) <= 25) {
        bonusFactor = 2;
    }

    return bonusFactor;
}

export const getCorrectPredictionsForUser = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const predictions = await Prediction.find({ user: id });


    if (!predictions) {
        return next(new ErrorHandler('Predictions not found', 404));
    }

    // get the correct predictions for the user
    let correctPredictions = predictions.filter((prediction: any) => prediction.predictedTeam === prediction.match.winner);

    res
        .status(200)
        .json({
            status: 'success',
            results: correctPredictions.length,
            data: correctPredictions
        });
})

export default {
    predict,
    updateScoreAfterMatch,
    getLeaderboard,
    getMyScore,
    getCorrectPredictionsForUser
}
