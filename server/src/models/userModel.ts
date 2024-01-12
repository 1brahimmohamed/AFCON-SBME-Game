import {Schema, model,  models} from "mongoose";
import validator from 'validator';

export interface IUser {
    name: string;
    email: string;
    password: string;
    team: string;
    class: string;
    role: string;
    score: number;
    predictions: Schema.Types.ObjectId[];
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
    }
}, {
    timestamps: true
})

const User = models.User || model<IUserDocument>('User', UserSchema)

export default User;
