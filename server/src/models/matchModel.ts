import {Schema, model,  models} from "mongoose";


export interface IMatch {
    name: string;
    startTime: Date;
    type: string;
    teamA: string;
    teamB: string;
    winner: string;
    scoreResolved: boolean;
    slug: string;
}

const MatchSchema = new Schema<IMatch>({
    name: {
        type: String,
        required: true,
    },
    startTime:{
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum : ['group', 'round of 16', 'quarter-finals', 'semi-finals', 'finals']
    },
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    },
    winner: {
        type: String,
    },
    scoreResolved: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        required: true
    }
});

const Match = models.Match || model<IMatch>('Match', MatchSchema)

export default Match;
