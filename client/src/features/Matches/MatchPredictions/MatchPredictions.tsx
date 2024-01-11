import MatchPeople from './MatchPeople'
import MatchPieChart from './MatchPieChart'
import MatchStats from './MatchStats'
import {getMatchPrediction} from '../../../services/apiPrediction.ts'
import {useLoaderData} from "react-router-dom";

const MatchPredictions = () => {

    const prediction: any = useLoaderData();

    const data = prediction.data.data

    const {teamA, teamB, draw, teams} = data

    const stats = [
        {name: teams.teamA, value: teamA.count, unit: 'votes', label: teams.teamA},
        {name: 'Draw', value: draw.count, unit: 'votes', label: 'Draw'},
        {name: teams.teamB, value: teamB.count, unit: 'votes', label: teams.teamB},
    ]

    return (
        <div>
            {
                prediction.data.results > 0 ? (
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

export const loader = async ({params}: { params: any }) => {
    const {slug} = params
    return await getMatchPrediction(slug)
}
export default MatchPredictions
