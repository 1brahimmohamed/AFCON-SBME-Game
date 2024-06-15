import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute: React.FC<{ fallbackPath: string }> = ({ fallbackPath }) => {

    const authUser: any = useAuthUser();
    const isAuthenticated = useIsAuthenticated()

    if (!isAuthenticated) {
        return <Navigate to={fallbackPath} />;
    }

    if (authUser?.role !== 'admin') {
        return <Navigate to={fallbackPath} />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
