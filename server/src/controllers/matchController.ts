import Match from "../models/matchModel";
import { Request, Response, NextFunction } from "express";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import slugify from "slugify";

export const getMatch = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const match = await Match.findById(id);

    if (!match) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Match not found'
            });
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
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Match not found'
            });
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
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Match not found'
            });
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
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'There are no matches today'
            });
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