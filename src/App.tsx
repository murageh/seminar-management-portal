import './App.css'
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {ProtectedRoute} from "./routing/ProtectedRoute.tsx";
import FullScreenLoader from "./components/loaders/FullScreenLoader.tsx";
import AuthLayout from "./layouts/auth/AuthLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";
import {SeminarPage} from "./pages/seminars/SeminarPage.tsx";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {CustomerPage} from "./pages/CustomerPage.tsx";
import SeminarDetail from "./pages/seminars/SeminarDetail.tsx";
import SeminarRegistrationForm from "./pages/seminars/SeminarRegistrationForm.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="auth" element={<AuthLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
            <Route path="dashboard" element={<ProtectedRoute/>}>
                <Route path="" element={<DashboardLayout/>}>
                    <Route index element={<SeminarPage/>}/>
                    <Route path="seminars" element={<SeminarPage/>}/>
                    {/*<Route path="seminar/new" element={<SeminarDetail mode={'edit'}/>}/>*/}
                    <Route path="seminars/register" element={<SeminarRegistrationForm/>}/>
                    <Route path="seminars/register/:no" element={<SeminarRegistrationForm/>}/>
                    <Route path="seminars/:no" element={<SeminarDetail mode={'view'}/>}/>
                    <Route path="employees" element={<EmployeePage/>}/>
                    <Route path="customers" element={<CustomerPage/>}/>
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
