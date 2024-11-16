import './App.css'
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {ProtectedRoute} from "./routing/ProtectedRoute.tsx";
import FullScreenLoader from "./components/loaders/FullScreenLoader.tsx";
import AuthLayout from "./layouts/auth/AuthLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="auth" element={<AuthLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
            <Route path="dashboard" element={<ProtectedRoute/>}>
                <Route path="" element={<DashboardLayout/>}>
                    <Route index element={<>SeminarsPage</>}/>
                    <Route path="seminars" element={<>SeminarsPage</>}/>
                    <Route path="employees" element={<>EmployeesPage</>}/>
                    <Route path="customers" element={<>CustomersPage</>}/>
                </Route>
            </Route>
            <Route path="*" element={<>NotFoundPage</>}/>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<FullScreenLoader/>}/>
        </>
    );
}

export default App
