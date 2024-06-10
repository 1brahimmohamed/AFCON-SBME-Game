export interface IMatch {
    "_id": string;
    name: string;
    startTime: Date;
    type: string;
    teamA: string;
    teamB: string;
    winner?: string;
    scoreResolved: boolean;
    slug: string;
}


