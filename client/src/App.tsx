import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes.jsx";
import AuthProvider from 'react-auth-kit'
import store from "./features/Auth/store.js";


function App() {

  return (
    <>
      <AuthProvider store={store}>
        <RouterProvider router={AppRouter} />
      </AuthProvider>
    </>
  )
}

export default App
