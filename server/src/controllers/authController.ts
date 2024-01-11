import User from "../models/userModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import {Request, Response, NextFunction } from "express";

import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailHandler from "../utils/Email/sendMail";


const signToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN!)* 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    };

    // if we are in production mode, we need to set the cookie to be secure
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

export const login = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Please provide email and password'
            });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'User not found'
            });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'Invalid credentials'
            });
    }

    createSendToken(user, 200, res);
})

export const signup = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm, team } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Please provide name, email, password and passwordConfirm'
            });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'User already exists'
            });
    }

    // only @eng-st.cu.edu.eg emails are allowed
    if (!email.endsWith('@eng-st.cu.edu.eg')) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Only @eng-st.cu.edu.eg emails are allowed'
            });
    }

    // encrypt the password
    const hashedPassword = await bycrypt.hash(password, 12);


    const user = await User.create({
        name,
        email,
        team,
        password: hashedPassword,
        passwordConfirm
    });

    createSendToken(user, 201, res);

    await sendEmailHandler(user);
})

export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        status: 'success'
    });
}

export const protect = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    let token;

    console.log(req.cookies)


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies._auth) {
        token = req.cookies._auth;
    }



    if (!token)
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please log in to get access.'
        });



    // Verify the token
    const decoded : any = jwt.verify(token, process.env.JWT_SECRET!);

    console.log(decoded);

    // Check if user still exists
    const newUser = await User.findById(decoded.id!);

    if (!newUser)
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token does no longer exist.'
        });

    // Grant accesses to protected route
    req.user = newUser;

    next();
})

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'user']. role='user'
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    }
}

export default {
    signup,
    login,
    logout,
    protect,
    restrictTo
};
