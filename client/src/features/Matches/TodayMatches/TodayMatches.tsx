import MatchCard from './MatchCard'
import {getTodayMatches} from '../../../services/apiMatches'
import {useQuery} from "@tanstack/react-query";
import Loading from "../../../ui/Loading.tsx";

const TodayMatches = () => {

    const {data: matches, isLoading, isLoadingError} = useQuery({
        queryKey: ['today-matches'],
        queryFn: getTodayMatches,
    });

    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    return (
        <div className="p-5">
            {
                matches.length > 0 ? (
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {matches.map((match: any) => (
                            <MatchCard key={match._id} match={match}/>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-700">There is No Matches Today</h1>
                    </div>
                )
            }
        </div>
    )
}

export default TodayMatches
