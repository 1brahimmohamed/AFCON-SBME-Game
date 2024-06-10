import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {Link} from "react-router-dom";


const PersonCard = ({data} : {data: any}) => {
    return (
        <ul
            role="list"
            className="overflow-y-scroll bg-white shadow-sm sm:rounded-xl w-full max-h-[75vh]"
        >
            {data.map((user: any) => (
                <li key={user.email} className="relative flex justify-between gap-x-6 py-5 hover:bg-gray-50">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <Link to={`/admin/users/${user._id}`}>
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {user.name}
                                </Link>
                            </p>
                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${user.email}`} className="relative truncate hover:underline">
                                    {user.email}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{user.class}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Score {user.score}
                                </p>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default PersonCard
