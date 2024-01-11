import Prediction from '../models/predictionModel';
import { Request, Response, NextFunction } from "express";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import Match from "../models/matchModel";


export const getAllPredictions = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const predictions = await Prediction.find();

    res
        .status(200)
        .json({
            status: 'success',
            results: predictions.length,
            data: predictions
        });
})

export const getPrediction = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const prediction = await Prediction.findById(id);

    if (!prediction) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Prediction not found'
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: prediction
        });
})

export const getMatchPredictions = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const { slug } = req.params;

    // get the match
    const match = await Match.findOne({ slug });

    const predictions = await Prediction.find({ match: match?._id });

    if (!predictions) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Prediction not found'
            });
    }

    // divide the predictions into 3 arrays, one for each result
    const teamA = predictions.filter(prediction => prediction.predictedTeam === match?.teamA);
    const teamB = predictions.filter(prediction => prediction.predictedTeam === match?.teamB);
    const draw = predictions.filter(prediction => prediction.predictedTeam === 'Draw');


    res
        .status(200)
        .json({
            status: 'success',
            results: predictions.length,
            data: {
                teamA: {
                    count: teamA.length,
                    users: teamA.map(prediction => prediction.user)
                },
                teamB: {
                    count: teamB.length,
                    users: teamB.map(prediction => prediction.user)
                },
                draw: {
                    count: draw.length,
                    users: draw.map(prediction => prediction.user)
                },
                teams: {
                    teamA: match?.teamA,
                    teamB: match?.teamB
                }
            }
        });
})

export const getMyPredictions = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const predictions = await Prediction.find({ user: id });

    if (!predictions) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Prediction not found'
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            results: predictions.length,
            data: predictions
        });
})


export const deletePrediction = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const prediction = await Prediction.findByIdAndDelete(id);

    if (!prediction) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Prediction not found'
            });
    }

    res
        .status(204)
        .json({
            status: 'success',
            data: null
        });
})

export default {
    getAllPredictions,
    getPrediction,
    getMatchPredictions,
    getMyPredictions,
    deletePrediction
};
