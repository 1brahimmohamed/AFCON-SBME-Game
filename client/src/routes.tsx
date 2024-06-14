import {createBrowserRouter} from "react-router-dom";

import AppLayout from "./ui/layouts/AppLayout";
// import AdminLayout from "./ui/layouts/AdminLayout.tsx";

import LoginPage from "./features/Auth/login/LoginPage";
import RegisterPage from "./features/Auth/register/RegisterPage";
import HomePage from "./ui/Hero";
import Leaderboard from "./features/Leaderbaords/Leaderboard";
import TodayMatches from "./features/Matches/TodayMatches/TodayMatches";
import MatchPredictions from "./features/Matches/MatchPredictions/MatchPredictions";

import Error from "./ui/Error";
import NotFount from "./ui/404.tsx";
import Rules from "./ui/Rules.tsx";

import AllMatches from "./features/Matches/AllMatches/AllMatches";
// import AllUsers, {loader as allUsersLoader} from "./features/Admin/Users/AllUsers.tsx";
import ForgetPasswordPage from "./features/Auth/forget/ForgetPasswordPage.tsx";
import ResetPasswordPage, {loader as checkTokenLoader} from "./features/Auth/reset/ResetPasswordPage.tsx";
import TokenError from "./ui/TokenError.tsx";
import HallOfFame from "./ui/HallOfFame.tsx";

import AuthOutlet from '@auth-kit/react-router/AuthOutlet';


const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/rules',
                element: <Rules/>
            },
            {
                path: '/hall-of-fame',
                element: <HallOfFame/>,
            }
        ]
    },
    {
        path: '/',
        element: <AuthOutlet fallbackPath={'/auth/login'}/>,
        children: [
            {
                element: <AppLayout/>,
                errorElement: <Error/>,
                children: [
                    {
                        path: '/leaderboards',
                        element: <Leaderboard/>,
                    },
                    {
                        path: "today-matches",
                        element: <TodayMatches/>,
                    },

                    {
                        path: "all-matches",
                        element: <AllMatches/>,
                    },
                    {
                        path: "match/:slug",
                        element: <MatchPredictions/>,
                    },
                ],
            }
        ]
    },

    {
        path: '/auth/login',
        element: <LoginPage/>
    },
    {
        path: '/auth/register',
        element: <RegisterPage/>
    },
    {
        path: '/auth/forget-password',
        element: <ForgetPasswordPage/>
    },
    {
        path: '/auth/reset-password/:token',
        element: <ResetPasswordPage/>,
        loader: checkTokenLoader,
        errorElement: <TokenError/>
    },
    {
        path: '*',
        element: <NotFount/>
    },
]);

export default router
