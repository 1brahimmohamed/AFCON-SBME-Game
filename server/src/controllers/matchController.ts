import Match from "../models/matchModel";
import { Request, Response, NextFunction } from "express";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import slugify from "slugify";
import errorHandler from "../utils/errorHandler";
export const getMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const match = await Match.findById(id);

    if (!match) {
       return next(new errorHandler('Match not found', 404));
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: match
        });
})

export const getAllMatches = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const matches = await Match.find();

    res
        .status(200)
        .json({
            status: 'success',
            results: matches.length,
            data: matches
        });
})

export const createMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    // create slug
    const slug = slugify(`${req.body.teamA} vs ${req.body.teamB} ${req.body.type}`, {lower: true});

    const match = await Match.create({
        ...req.body,
        slug
    });

    res
        .status(201)
        .json({
            status: 'success',
            data: match
        });
})

export const updateMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!match) {
        return next(new errorHandler('Match not found', 404));
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: match
        });
})

export const deleteMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const match = await Match.findByIdAndDelete(id);

    if (!match) {
        return next(new errorHandler('Match not found', 404));
    }

    res
        .status(204)
        .json({
            status: 'success',
            data: null
        })
})


export const getTodayMatches = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const matches = await Match.find({});
    const todayMatches = matches.filter(match => match.startTime.getDate() === new Date().getDate());

    if (!todayMatches) {
        return next(new errorHandler('There is no matches today', 404));
    }

    res
        .status(200)
        .json({
            status: 'success',
            results: todayMatches.length,
            data: todayMatches
        })
})


export default {
    getMatch,
    getAllMatches,
    createMatch,
    updateMatch,
    deleteMatch,
    getTodayMatches
}
