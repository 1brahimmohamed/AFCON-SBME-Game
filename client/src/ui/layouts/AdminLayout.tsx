import Header from "../../features/Admin/Shared/Header.tsx";
import {Outlet} from "react-router-dom";


const AdminLayout = () => {

    return (
        <>
            <div className="min-h-full">
                <Header/>
                <div className={"mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 my-10"}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
