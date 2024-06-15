import {deleteUser, getAllUsers} from "../../../services/apiAdmin.ts";
import {useQuery} from "@tanstack/react-query";
import Loading from "../../../ui/Loading.tsx";
import {useNavigate} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdminUsers = () => {

    const {data: users, isLoading, isLoadingError} = useQuery({
        queryKey: ['admin-all-users'],
        queryFn: getAllUsers,
    });
    const navigate = useNavigate();


    if (isLoading) {
        return <Loading/>;
    }

    if (isLoadingError) {
        throw new Error('Something went wrong .. Please try again later');
    }

    const handleOnEdit = (id: string) => {
        navigate(`/eur-admin/users/${id}`);
    }

    const handleOnDelete = (id: string) => {
        withReactContent(Swal).fire({
            title: `Are you sure you want to delete user with Id ${id} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes Delete",
            cancelButtonText: `No`,
            confirmButtonColor: "#002c1e",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteUser(id);

                if (res.status === 200) {
                    toast.success('User Deleted Successful', { duration: 1500, position: 'bottom-center' })
                } else {
                    toast.error("Error on deleting user", { duration: 1500, position: 'bottom-center' })
                }
            }
        })
    }

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    id
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Name
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Email
                                </th>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Class
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Score
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Team
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {users.map((user: any) => (
                                <tr key={user._id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user._id}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.name}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.class}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.score}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.team}
                                    </td>
                                    <td className="whitespace-nowrap flex py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 gap-x-3">

                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => handleOnEdit(user._id)}>
                                            🖊️
                                        </button>

                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => handleOnDelete(user._id)}>
                                            🗑️
                                        </button>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminUsers;
