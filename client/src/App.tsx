import {RouterProvider} from "react-router-dom";
import AppRouter from "./routes.jsx";
import AuthProvider from 'react-auth-kit'
import store from "./features/Auth/store.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <AuthProvider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <RouterProvider router={AppRouter}/>
                </QueryClientProvider>
                <Toaster />
            </AuthProvider>
        </>
    )
}

export default App
