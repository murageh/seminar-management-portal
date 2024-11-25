import './App.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,} from "react-router-dom";
import {ProtectedRoute} from "./routing/ProtectedRoute.tsx";
import Loader from "./components/loaders/Loaders.tsx";
import AuthLayout from "./layouts/auth/AuthLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";
import {SeminarPage} from "./pages/seminars/SeminarPage.tsx";
import {EmployeePage} from "./pages/employees/EmployeePage.tsx";
import SeminarDetail from "./pages/seminars/SeminarDetail.tsx";
import SeminarRegistrationForm from "./pages/seminars/SeminarRegistrationForm.tsx";
import {MyRegistrationsPage} from "./pages/seminars/MyRegistrationsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Navigate to="/dashboard"/>}/>
            <Route path="auth" element={<AuthLayout/>}>
                <Route index element={<Navigate to="/auth/login"/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
            <Route path="dashboard" element={<ProtectedRoute/>}>
                <Route element={<DashboardLayout/>}>
                    <Route index element={<MyRegistrationsPage/>}/>
                    <Route path="seminars" element={<SeminarPage/>}/>
                    <Route path="seminars/register" element={<SeminarRegistrationForm/>}/>
                    <Route path="seminars/register/:no" element={<SeminarRegistrationForm/>}/>
                    <Route path="seminars/:no" element={<SeminarDetail/>}/>
                    <Route path="employees" element={<EmployeePage/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<Loader/>}/>
        </>
    );
}

export default App
