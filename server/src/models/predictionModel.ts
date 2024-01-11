import {Schema, model,  models} from "mongoose";


export interface IPrediction {
    user: Schema.Types.ObjectId;
    match: Schema.Types.ObjectId;
    predictedTeam: string;
}

const PredictionSchema = new Schema<IPrediction>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    predictedTeam: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

PredictionSchema.pre(/^find/, function (this: any, next: () => void) {
    this.populate({
        path: 'user',
        select: 'name email score' 
    })

    this.populate({
        path: 'match',
        select: 'name teamA teamB winner' 
    })
    next();
});

const Prediction = models.Prediction || model<IPrediction>('Prediction', PredictionSchema)

export default Prediction;