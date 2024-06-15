import {useQuery} from "@tanstack/react-query";
import {getAllMatches} from "../../../services/apiMatches.ts";
import Loading from "../../../ui/Loading.tsx";
import {Link} from "react-router-dom";

const AdminMatches = () => {

    const {data: matches, isLoading, isLoadingError} = useQuery({
        queryKey: ['admin-all-matches'],
        queryFn: getAllMatches,
    });

    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }


    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    id
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Home
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Away
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Match Date
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Start Time
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Winner
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Score Resolved
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {matches.map((match: any) => (
                                <tr key={match._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {match._id}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {match.teamA}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {match.teamB}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {new Date(match.startTime).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {new Date(match.startTime).toLocaleTimeString()}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {match.winner ? match.winner : "TBD"}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {match.scoreResolved ? "✅" : "🔄️"}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        <Link to={`/eur-admin/matches/${match._id}`}>
                                            🖊️
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMatches;
