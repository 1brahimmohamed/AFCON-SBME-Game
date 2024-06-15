import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Loading from "../../../ui/Loading.tsx";
import {getMatch, resolveScoreAfterMatch, updateWinner} from "../../../services/apiAdmin.ts";
import {useState} from "react";
import toast from "react-hot-toast";


const DisplayField = ({header, value}: { header: string, value: string }) => {
    return (
        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">{header}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
        </div>
    )
}

const AdminMatch= () => {


    const {id} = useParams<{ id: string }>();
    const [winner, setWinner] = useState('');
    const queryClient = useQueryClient();

    const {data: match, isLoading, isLoadingError} = useQuery({
        queryKey: [`match`, id],
        queryFn: () => getMatch(id || ''),
    });

    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    const handleSaveWinner = async () => {
        if (winner === '') {
            toast.error('Please enter a winner', { duration: 1500, position: 'bottom-center' })
            return;
        }

        const res = await updateWinner( match._id, winner);

        if (res.status === "success") {
            toast.success('Winner Set Successful', { duration: 1500, position: 'bottom-center' })
            await queryClient.invalidateQueries({
                queryKey: [`match`, id],

            })

        } else {
            toast.error(res.message, { duration: 1500, position: 'bottom-center' })
        }
    }

    const handleScoreResolve = async () => {
        const res = await resolveScoreAfterMatch(match._id);

        if (res.status === "success") {
            toast.success('Score Resolved Successful', { duration: 1500, position: 'bottom-center' })
            await queryClient.invalidateQueries({
                queryKey: [`match`, id],

            })
        } else {
            toast.error(res.message, { duration: 1500, position: 'bottom-center' })
        }
    }

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">

                    <DisplayField header={"Name"} value={match.name}/>
                    <DisplayField header={"Team A"} value={match.teamA}/>
                    <DisplayField header={"Team B"} value={match.teamB}/>
                    <DisplayField header={"Start Time"} value={match.startTime}/>
                    <DisplayField header={"StartDate"} value={match.startTime}/>
                    <DisplayField header={"Winner"} value={match.winner ? match.winner : "TBD"}/>
                    <DisplayField header={"Score Resolved"} value={match.scoreResolved ? "✅" : "🔄️"}/>
                    <DisplayField header={"Slug"} value={match.slug}/>

                </dl>
            </div>

            <hr/>
            <div className="mt-6 border-t border-gray-100 flex justify-between items-center">
                <dt className="text-sm font-medium leading-6 text-gray-900">{'Set Winner'}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                        type="text"
                        className="border border-gray-300 px-2 py-1 rounded"
                        value={winner}
                        onChange={(e) => setWinner(e.target.value)}
                        autoFocus
                    />
                </dd>

                <button className={"mt-4 bg-green-500 text-white px-4 py-2 rounded"} onClick={handleSaveWinner}>Save Winner</button>

            </div>

            <div className="mt-6 border-t border-gray-100 flex justify-between items-center">
                <dt className="text-sm font-medium leading-6 text-gray-900">{'Resolve Score'}</dt>
                <button className={"mt-4 bg-green-500 text-white px-4 py-2 rounded"} onClick={handleScoreResolve}>Save
                    Resolve Score
                </button>

            </div>


        </div>
    )
}

export default AdminMatch
