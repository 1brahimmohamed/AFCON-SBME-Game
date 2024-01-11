import MatchPeople from './MatchPeople'
import MatchPieChart from './MatchPieChart'
import MatchStats from './MatchStats'
import {getMatchPrediction} from '../../../services/apiPrediction.ts'
import {useLoaderData} from "react-router-dom";

const MatchPredictions = () => {

    const prediction: any = useLoaderData();

    const data = prediction.data

    const stats = [
        {name: data.teams.teamA, value: data.teamA.count, unit: 'votes', label: data.teams.teamA},
        {name: 'Draw', value: data.draw.count, unit: 'votes', label: 'Draw'},
        {name: data.teams.teamB, value: data.teamB.count, unit: 'votes', label: data.teams.teamB},
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
                                <MatchPeople TableTitle={data.teams.teamA} users={data.teamA.users}/>
                                <MatchPeople TableTitle='Draw' users={data.draw.users}/>
                                <MatchPeople TableTitle={data.teams.teamB} users={data.teamB.users}/>
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
