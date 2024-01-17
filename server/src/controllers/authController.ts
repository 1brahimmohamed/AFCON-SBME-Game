import User from "../models/userModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import {Request, Response, NextFunction} from "express";
import errorHandler from "../utils/errorHandler";
import * as crypto from "crypto";

import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailHandler from "../utils/Email/sendMail";
import sendResetMail from "../utils/resetEmail/sendResetMail";


const signToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = signToken(user._id);

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

const login = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({
                status: 'fail',
                message: 'Please provide email and password'
            });
    }

    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return next(new errorHandler('Invalid credentials', 404));
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new errorHandler('Invalid credentials', 404));
    }
    createSendToken(user, 200, res);
})

const signup = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password, passwordConfirm, team, year} = req.body;

    if (!name || !email || !password || !passwordConfirm) {
        return next(new errorHandler('Please provide all the required fields', 400));
    }

    if (password !== passwordConfirm) {
        return next(new errorHandler('Passwords do not match', 400));
    }

    if (password.length < 6) {
        return next(new errorHandler('Password must be at least 6 characters', 400));
    }

    // check if the user already exists
    const existingUser = await User.findOne({email});

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
        return next(new errorHandler('Only @eng-st.cu.edu.eg emails are allowed', 400));
    }

    // encrypt the password
    const hashedPassword = await bycrypt.hash(password, 12);


    const user = await User.create({
        name,
        email: email.toLowerCase(),
        team,
        password: hashedPassword,
        class: year,
    });

    createSendToken(user, 201, res);

    await sendEmailHandler(user);
})

const logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        status: 'success'
    });
}

const protect = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies._auth) {
        token = req.cookies._auth;
    }

    if (!token)
        return next(new errorHandler('You are not logged in! Please log in to get access.', 401));

    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    console.log(decoded);

    // Check if user still exists
    const newUser = await User.findById(decoded.id!);

    if (!newUser)
        return next(new errorHandler('The user belonging to this token does no longer exist.', 401));


    // Grant accesses to protected route
    req.user = newUser;

    next();
})

const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'user']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(new errorHandler('You do not have permission to perform this action', 403))
        }

        next();
    }
}


const forgotPassword = asyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const {email} = req.body;

    const user = await User.findOne({email});

    if (!user) return next(new errorHandler('There is no user with email address.', 404));

    const resetToken = user.createPasswordResetToken();

    await user.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`;

    try {
        await sendResetMail(user, resetURL);

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });

    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(
            new errorHandler(
                'There was an error sending the email. Try again later!',
                500
            )
        );
    }
});

const resetPassword = asyncErrorCatching(async (req, res, next) => {

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });


    if (!user) return next(new errorHandler('Token is invalid or has expired', 400));

    // hash the new password
    const hashedPassword = await bycrypt.hash(req.body.password, 12);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Password changed successfully, you can log in now'
    });
});

const checkIfResetTokenExists = asyncErrorCatching(async (req, res, next) => {

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });

    if (!user) return next(new errorHandler('Token is invalid or has expired', 400));

    res.status(200).json({
        status: 'success',
        data: {
            name: user.name,
        }
    });
});


export default {
    signup,
    login,
    logout,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    checkIfResetTokenExists
};
