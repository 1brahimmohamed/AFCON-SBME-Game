import AllMatchCard from './AllMatchCard.tsx'
import { getAllMatches } from '../../../services/apiMatches'
import { useLoaderData } from 'react-router-dom';

const AllMatches = () => {

    const matches: any = useLoaderData();


    return (
        <div className="p-5">
            {
                matches.length > 0 ? (
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {matches.map((match: any) => (
                            <AllMatchCard key={match._id} match={match}/>
                        ))}
                    </ul>
                ) :(
                    <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-gray-700">There is No Matches Yet</h1>
                    </div>
                )
            }
        </div>
    )
}

export const loader = async() => {
    return await getAllMatches();
}

export default AllMatches
