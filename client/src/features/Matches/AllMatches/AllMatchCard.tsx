import AllMatchTeam from './AllMatchTeam.tsx';
import {FaPeopleGroup} from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';

const convertDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    if (minutes === 0)
        return `${hours}:00`
    else
    return `${hours}:${minutes}`
}

const convertToProperString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


const AllMatchCard = ({match}: { match: any }) => {

    const navigate = useNavigate();

    return (
        <li
            key={match._id}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow`} // opacity-50
        >
            <div className='flex-col'>
                <div className='flex justify-between p-5 text-left'>
                    <div className="text-md md:text-lg text-gray-500 w-1/3 text-left">
                        {convertToProperString(match.type)}
                    </div>
                    <div className="text-md md:text-lg font-medium text-gray-900 w-1/3 text-center">
                        {match.name}
                    </div>
                    <div className="text-md md:text-lg text-gray-500 w-1/3 text-right">
                        {convertDate(match.startTime)}
                    </div>
                </div>

                <div className='flex'>
                    <AllMatchTeam team={match.teamA} side="Home" winner={match.winner? `${match.winner}`: ``} />

                    <div className="w-px flex-1 h-full my-auto">
                        <div className='my-1 md:my-6'>VS</div>
                    </div>

                    <AllMatchTeam team={match.teamB} side='Away' winner={match.winner? `${match.winner}`: ``}/>
                </div>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="-ml-px flex w-0 flex-1">
                        <button
                            onClick={() => navigate(`/match/${match.slug}`)}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <FaPeopleGroup className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            Predictions
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default AllMatchCard
