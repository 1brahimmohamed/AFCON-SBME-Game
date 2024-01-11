import User from "../models/userModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import { Request, Response, NextFunction } from "express";


export const getAllUsers = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res
        .status(200)
        .json({
            status: 'success',
            results: users.length,
            data: users
        });
})

export const getUser = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'User not found'
            });
    }  

    res
        .status(200)
        .json({
            status: 'success',
            data: user
        })
})

export const createUser = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res
        .status(201)
        .json({
            status: 'success',
            data: user
        });
})

export const updateUser = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
})

export const deleteUser = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res
        .status(204)
        .json({
            status: 'success',
            data: null
        });
})


export default {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
