import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/layouts/AppLayout";
// import AdminLayout from "./ui/layouts/AdminLayout.tsx";

import LoginPage from "./features/Auth/login/LoginPage";
import RegisterPage from "./features/Auth/register/RegisterPage";
import HomePage from "./ui/Hero";
import Leaderboard, { loader as LeaderbaordsLoader } from "./features/Leaderbaords/Leaderboard";
import TodayMatches, { loader as todayMatchesLoader } from "./features/Matches/TodayMatches/TodayMatches";
import MatchPredictions, {loader as matchPredictionLoader} from "./features/Matches/MatchPredictions/MatchPredictions";

import Error from "./ui/Error";
import NotFount from "./ui/404.tsx";
import Rules from "./ui/Rules.tsx";

import AllMatches, { loader as allMatchesLoader } from "./features/Matches/AllMatches/AllMatches";
// import AllUsers, {loader as allUsersLoader} from "./features/Admin/Users/AllUsers.tsx";
import ForgetPasswordPage from "./features/Auth/forget/ForgetPasswordPage.tsx";
import ResetPasswordPage, {loader as checkTokenLoader} from "./features/Auth/reset/ResetPasswordPage.tsx";
import TokenError from "./ui/TokenError.tsx";



const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/leaderboards',
                element: <Leaderboard />,
                loader: LeaderbaordsLoader
            },
            {
                path: "today-matches",
                element: <TodayMatches />,
                loader: todayMatchesLoader
            },
            {
                path: "all-matches",
                element: <AllMatches />,
                loader: allMatchesLoader
            },
            {
                path: "match/:slug",
                element: <MatchPredictions />,
                loader: matchPredictionLoader
            },
            {
                path: '/rules',
                element: <Rules />
            }
        ],
    },
    // {
    //     element: <AdminLayout />,
    //     errorElement: <Error />,
    //     children: [
    //         {
    //             path: '/admin',
    //             index: true,
    //         },
    //         {
    //             path: '/admin/users',
    //             element: <AllUsers />,
    //             loader: allUsersLoader
    //         }
    //     ]
    // },
    {
        path: '/auth/login',
        element: <LoginPage />
    },
    {
        path: '/auth/register',
        element: <RegisterPage />
    },
    {
        path: '/auth/forget-password',
        element: <ForgetPasswordPage />
    },
    {
        path: '/auth/reset-password/:token',
        element: <ResetPasswordPage />,
        loader: checkTokenLoader,
        errorElement: <TokenError />
    },
    {
        path: '*',
        element: <NotFount />
    },
]);

export default router
