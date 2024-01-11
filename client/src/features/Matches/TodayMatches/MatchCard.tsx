
import MatchTeam from './MatchTeam';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { predict } from '../../../services/apiGame';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const convertDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${hours}:${minutes}`
}

const convertToProperString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const MatchCard = ({ match }: { match: any }) => {

    const [selectedTeam, setSelectedTeam] = useState('')
    const isAuthenticated = useIsAuthenticated()
    const token = useAuthHeader();
    const navigate = useNavigate();

    const handleTeamClick = (team: string) => {
        setSelectedTeam(team);
    }

    const handlePrediction = (selectedOption : string) => {

        if (isAuthenticated()) {
            if (selectedTeam || selectedOption === "Draw") {
                let prediction = selectedTeam;
                if (selectedOption === "Draw")
                    prediction = "Draw"

                withReactContent(Swal).fire({
                    title: `Are you sure you want to predict ${prediction} ?`,
                    showCancelButton: true,
                    confirmButtonText: "Yes Predict",
                    cancelButtonText: `I will think again .. thank you dev for helping me`,
                    confirmButtonColor: "#002c1e",
                }).then(async (result) => {
                    let prediction = selectedTeam;

                    if (result.isConfirmed) {
                        if (selectedOption === "Draw")
                            prediction = "Draw"

                        console.log(prediction);
                        console.log(token)
                        const res = await predict(prediction, match._id, token? token : '');
                        if (res) {
                            withReactContent(Swal).fire({
                                title: res.message,
                                icon: "success",
                                confirmButtonColor: "#002c1e",
                                timer: 1500
                            })
                        }
                    } else if (result.isDenied) {
                        // close modal
                    }
                })
            }
            else {
                withReactContent(Swal).fire({
                    title: "Please select a team",
                    icon: "error",
                    confirmButtonColor: "#002c1e",
                    timer: 1500
                })
            }
        } else {
            withReactContent(Swal).fire({
                title: "You are not logged in, Please login to predict",
                icon: "error",
                confirmButtonColor: "#002c1e",
                timer: 1500
            })
        }
    }


    const matchHasStarted : boolean = match.startTime < new Date(Date.now()).toISOString();


    return (
        <li
            key={match._id}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow ${matchHasStarted ? 'opacity-50' : ''} `} // opacity-50
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
                    <MatchTeam team={match.teamA} side="Home" onClick={() => handleTeamClick(match.teamA)} selected={selectedTeam === match.teamA} />

                    <div className="w-px flex-1 h-full my-auto">
                        <div className='my-1 md:my-6'>VS</div>
                    </div>

                    <MatchTeam team={match.teamB} side='Away' onClick={() => handleTeamClick(match.teamB)} selected={selectedTeam === match.teamB} />
                </div>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <button
                            disabled={matchHasStarted}
                            onClick={()=> handlePrediction('Teams')}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <FaCheck className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Submit
                        </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <button
                            disabled={matchHasStarted}
                            onClick={()=> handlePrediction('Draw')}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <FaPeopleGroup className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Draw
                        </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <button
                            onClick={() => navigate(`/match/${match.slug}`)}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <FaPeopleGroup className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Predictions
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default MatchCard
