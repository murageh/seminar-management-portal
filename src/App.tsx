import './App.css'
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Flip, ToastContainer} from "react-toastify";

const router = createBrowserRouter(
    // Some dummy routing
    createRoutesFromElements(
        [
            <Route path="/" element={<DashboardLayout>
                <h1>Some component goes here</h1>
            </DashboardLayout>}/>
            ,
            <Route path="test" element={<>Test route</>}/>
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
