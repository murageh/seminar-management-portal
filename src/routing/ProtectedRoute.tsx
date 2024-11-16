import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../state/hooks.ts";

export const ProtectedRoute = () => {
    // const navigate = useNavigate();
    const {loggedIn: isAuthenticated} = useAppSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to='/auth/login'/>;
    } else return <Outlet/>
};
