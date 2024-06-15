import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Loading from "../../../ui/Loading.tsx";
import {getUser} from "../../../services/apiAdmin.ts";


const DisplayField = ({header, value}: { header: string, value: string }) => {
    return (
        <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">{header}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
        </div>
    )
}

const AdminUser = () => {


    const {id} = useParams<{ id: string }>();

    const {data: user, isLoading, isLoadingError} = useQuery({
        queryKey: [`user`, id],
        queryFn: () => getUser(id || ''),
    });

    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">

                    <DisplayField header={"Full Name"} value={user.name}/>
                    <DisplayField header={"Email"} value={user.email}/>
                    <DisplayField header={"Class"} value={user.class}/>
                    <DisplayField header={"Score"} value={user.score}/>
                    <DisplayField header={"Team"} value={user.team}/>

                </dl>
            </div>
        </div>
    )
}


export default AdminUser
