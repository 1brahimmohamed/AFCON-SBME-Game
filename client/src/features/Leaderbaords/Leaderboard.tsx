import {getLeaderboard} from "../../services/apiGame.ts"
import {getScore} from "../../services/apiGame"
import Loading from "../../ui/Loading.tsx";
import {useQuery} from '@tanstack/react-query';

const Leaderboard = () => {

    const {
        data: leaderboards,
        isLoading: isLeaderboardsLoading,
        isLoadingError: isLeaderboardsLoadingError
    } = useQuery({
        queryKey: ['leaderboards'],
        queryFn: getLeaderboard,
    });

    const {
        data: score,
        isLoading: isScoreLoading,
    } = useQuery({
        queryKey: ['score'],
        queryFn: getScore,
    });


    if (isLeaderboardsLoading || isScoreLoading) {
        return <Loading/>;
    }

    if (isLeaderboardsLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Leaderboards</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of our players and their scores.
                    </p>
                </div>

                {
                    score ?
                        (<div className="sm:flex-auto text-left sm:text-right">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Your Score is</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                {score}
                            </p>
                        </div>) : ""
                }
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        #
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Class
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Score
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {leaderboards.map((person: any, index: number) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {index + 1 === 1 ? "🏆" : (index + 1)}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {person.class}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.score}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
