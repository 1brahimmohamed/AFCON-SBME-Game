import {Schema, model,  models} from "mongoose";
import validator from 'validator';
import * as crypto from "crypto";
export interface IUser {
    name: string;
    email: string;
    password: string;
    team: string;
    class: string;
    role: string;
    score: number;
    predictions: Schema.Types.ObjectId[];
    passwordResetToken: string;
    passwordResetExpires: Date;
}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    team: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        required: [true, 'Please enter your class'],
    },
    role: {
        type: String,
        default: 'user'
    },
    score: {
        type: Number,
        default: 0
    },
    predictions: {
        type: [Schema.Types.ObjectId],
        ref: 'Prediction',
        default: []
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
})


UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = models.User || model<IUserDocument>('User', UserSchema)

export default User;
