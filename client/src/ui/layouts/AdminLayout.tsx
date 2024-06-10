import Header from "../../features/Admin/Shared/Header.tsx";
import {Outlet} from "react-router-dom";


const AdminLayout = () => {
    return (
        <>

            <div className="min-h-full">
                <Header/>
                <Outlet/>
            </div>
        </>
    )
}

export default AdminLayout
