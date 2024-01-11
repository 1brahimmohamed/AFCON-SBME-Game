import Match from "../models/matchModel";
import User from "../models/userModel";
import Prediction from "../models/predictionModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import { Request, Response, NextFunction } from "express";


export const predict = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.user;
    const matchId = req.params.matchId;
    const { selectedTeam } = req.body;

    const match = await Match.findById(matchId);

    if (!match) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Match not found'
            });
    }

    // check if the match has already started
    if (match.startTime < new Date(Date.now())) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'You can not predict this match, it has already started'
            });
    }

    // check if selected team is valid
    if (match.teamA !== selectedTeam && match.teamB !== selectedTeam && selectedTeam !== 'Draw') {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Invalid team selected'
            });
    }

    const prediction = await Prediction.findOne({ user: req.user._id, match: matchId });

    if (prediction) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'You have already predicted this match'
            });
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
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Match not found'
            });
    }

    // check if score has already been resolved\
    if (match.scoreResolved) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Score has already been updated for this match'
            });
    }

    // check if the match has started
    if (match.startTime > new Date(Date.now())) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'You can not update the score for this match, it has not started yet'
            });
    }

    // check if the match has ended and there is a winner
    if (!match.winner) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'You can not update the score for this match, it has no winner yet'
            });
    }

    const matchWinner = match.winner;

    // get all match predictions
    const matchPredictions = await Prediction.find({ match: matchId });

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
                user.score += 1;
            } else if (type === 'round of 16') {
                user.score += 2;
            }
            else if (type === 'quarter-finals') {
                user.score += 3;
            }
            else if (type === 'semi-finals') {
                user.score += 4;
            }
            else if (type === 'finals') {
                user.score += 5;
            }
            await user.save();
        }
    });

    res
        .status(200)
        .json({
            status: 'success',
            message: 'Score updated successfully'
        })
});

export const getLeaderboard = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    
        const users = await User.find({}).sort({ score: -1 });
        
        res
            .status(200)
            .json({
                status: 'success',
                data: users
            });

});

export default {
    predict,
    updateScoreAfterMatch,
    getLeaderboard
}
