import {Outlet, useNavigate} from "react-router-dom";

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated = true; // Replace with actual authentication check

    if (!isAuthenticated) {
        navigate('/auth/login');
    }

    return <Outlet/>;
};
