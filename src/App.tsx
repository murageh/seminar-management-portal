import './App.css'
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {Flip, ToastContainer} from "react-toastify";
import {ProtectedRoute} from "./routing/ProtectedRoute.tsx";

const router = createBrowserRouter(
    // Some dummy routing
    createRoutesFromElements(
        [
            <Route path="/" element={<Navigate to="/dashboard"/>}/>,
            <Route path="/dashboard/" element={<Navigate to="/dashboard/seminars"/>}/>,
            <Route path="auth" element={<>Auth route</>}>
                <Route path="login" element={<>Login route</>}/>
                <Route path="register" element={<>Register route</>}/>
            </Route>,
            <Route path="/dashboard" element={<ProtectedRoute/>}>
                <Route path="" element={<DashboardLayout/>}>
                    <Route path="seminars" element={<>Seminars route</>}/>
                    <Route path="employees" element={<>Employees route</>}/>
                    <Route path="customers" element={<>Customers route</>}/>
                </Route>
            </Route>,

            // Not found route
            <Route path={"*"} element={<>Custom Not Found Page</>}/>
        ]
    )
)

function App() {

    return (
        <div className="w-full p-0">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Flip}
            />
            <RouterProvider router={router}/>
        </div>
    );
}

export default App
