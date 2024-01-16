import COUNTRIES from "../../../utils/countries";
import {useEffect, useState} from "react";
import { FaCheck } from "react-icons/fa";
import { PiHandshakeFill } from "react-icons/pi";

const AllMatchTeam = ({ team, side, winner = null}: { team: string, side: string, winner: string | null }) => {

    // get the url of the flag
    const country = COUNTRIES.find((country) => country.name === team);

    let [isWinner, setIsWinner] = useState(false);
    let [isDraw, setIsDraw] = useState(false);

    useEffect(() => {
        if (winner === team) {
            setIsWinner(true);
        }
        if (winner === "Draw" ) {
            setIsDraw(true);
        }
    }, []);


    return (
        <div className="flex flex-1 flex-col p-8">
            <div className="w-full flex items-center justify-center">
                <div className="h-32 w-32 relative">
                    <img className={`mx-auto h-32 shadow-xl object-cover rounded-full`} src={country?.avatar} alt=""/>
                    {isWinner && (
                        <div className="absolute inset-0 bg-green-500 opacity-85 rounded-full flex justify-center items-center">
                            <FaCheck className="h-10 w-10 text-black" />
                        </div>
                    )}
                    {
                        isDraw && (
                            <div className="absolute inset-0 bg-yellow-500 opacity-85 rounded-full flex justify-center items-center">
                                <PiHandshakeFill className="h-10 w-10 text-black" />
                            </div>
                        )
                    }
                </div>
            </div>
            <h3 className="mt-6 text-sm font-medium text-gray-900">{team}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{side}</dd>
                <dt className="sr-only">Role</dt>
            </dl>
        </div>
    )
};

export default AllMatchTeam
