import MatchCard from './MatchCard'
import { getTodayMatches } from '../../../services/apiMatches'
import { useLoaderData } from 'react-router-dom';

const TodayMatches = () => {

    const matches: any = useLoaderData();

    return (
        <div className="p-5">
            {
                matches.length > 0 ? (
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {matches.map((match: any) => (
                            <MatchCard key={match._id} match={match} />
                        ))}
                    </ul>
                ) :(
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-700">There is No Matches Today</h1>
                    </div>
                )
            }
        </div>
    )
}

export const loader = async() => {
    return await getTodayMatches();
}

export default TodayMatches
