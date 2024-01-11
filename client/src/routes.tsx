import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/layouts/AppLayout";
import HomePage from "./ui/Hero";
import Leaderboard, { loader as LeaderbaordsLoader } from "./features/Leaderbaords/Leaderboard";
import LoginPage from "./features/Auth/login/LoginPage";
import RegisterPage from "./features/Auth/register/RegisterPage";
import Error from "./ui/Error";
import TodayMatches, { loader as todayMatchesLoader } from "./features/Matches/TodayMatches/TodayMatches";
import MatchPredictions, {loader as matchPredictionLoader} from "./features/Matches/MatchPredictions/MatchPredictions";
import NotFount from "./ui/404.tsx";

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
            },{
                path: "match/:slug",
                element: <MatchPredictions />,
                loader: matchPredictionLoader
            }
        ],
    },
    {
        path: '/auth/login',
        element: <LoginPage />
    },
    {
        path: '/auth/register',
        element: <RegisterPage />
    },
    {
        path: '*',
        element: <NotFount />
    }
]);

export default router
