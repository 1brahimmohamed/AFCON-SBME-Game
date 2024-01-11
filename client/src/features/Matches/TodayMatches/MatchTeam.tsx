import COUNTRIES from "../../../utils/countries";

const MatchTeam = ({ team, side, selected=true, onClick }: { team: string, side: string, selected: boolean, onClick: () => void }) => {
    
    // get the url of the flag
    const country = COUNTRIES.find((country) => country.name === team);

    return (
        <div className="flex flex-1 flex-col p-8">
            <div className="w-full flex items-center justify-center">
                <div className="h-32 w-32" onClick={onClick}>
                    <img className={`mx-auto h-32 shadow-xl object-cover rounded-full ${selected ? 'border-4 border-AASecondary' : ''}`} src={country?.avatar} alt="" />
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

export default MatchTeam