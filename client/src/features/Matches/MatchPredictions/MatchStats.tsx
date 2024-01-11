const matchStats = ({stats}: { stats: any }) => {

    return (
        <div className="text-white">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat: any) => (
                        <div key={stat.name} className="bg-AAPrimary px-4 py-6 sm:px-6 lg:px-8 rounded">
                            <p className="text-lg font-medium leading-6">{stat.name}</p>
                            <p className="mt-2 flex items-baseline gap-x-2">
                                <p className="text-4xl text-AASecondary font-semibold tracking-tight">{stat.value}</p>
                                {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default matchStats
