import MatchPeople from './MatchPeople'
import MatchPieChart from './MatchPieChart'
import MatchStats from './MatchStats'
import {getMatchPrediction} from '../../../services/apiPrediction.ts'
import {useQuery} from "@tanstack/react-query";
import Loading from "../../../ui/Loading.tsx";
import {useParams} from 'react-router-dom';

const MatchPredictions = () => {

    const {slug} = useParams<{ slug: string }>();

    const {data: prediction, isLoading, isLoadingError} = useQuery({
        queryKey: [`match-${slug}`],
        queryFn: () => getMatchPrediction(slug || ''),
    });

    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    console.log(prediction)

    const {teamA, teamB, draw, teams} = prediction.data

    const total = teamA.count + teamB.count + draw.count

    const stats = [
        {
            name: teams.teamA,
            value: teamA.count,
            percentage: Math.round((teamA.count / total) * 100),
            unit: 'vote',
            label: teams.teamA
        },
        {
            name: 'Draw',
            value: draw.count,
            percentage: Math.round((draw.count / total) * 100),
            unit: 'vote',
            label: 'Draw'
        },
        {
            name: teams.teamB,
            value: teamB.count,
            percentage: Math.round((teamB.count / total) * 100),
            unit: 'vote',
            label: teams.teamB
        },
    ]

    return (
        <div>
            {
                prediction.results > 0 ? (
                    <>
                        <div className='flex-col space-y-5'>
                            <div className='flex justify-center items-center'>
                                <MatchPieChart data={stats}/>
                            </div>
                            <MatchStats stats={stats}/>
                        </div>

                        <div className='mx-auto max-w-7xl'>
                            <div className='grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3'>
                                <MatchPeople TableTitle={teams.teamA} users={teamA.users}/>
                                <MatchPeople TableTitle='Draw' users={draw.users}/>
                                <MatchPeople TableTitle={teams.teamB} users={teamB.users}/>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-2xl font-semibold'>No prediction for this match yet</h1>
                    </div>
                )
            }

        </div>
    )
}

export default MatchPredictions
