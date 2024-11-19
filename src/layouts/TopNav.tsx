import {FaPlus} from "react-icons/fa6";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import {LuLogOut} from "react-icons/lu";
import {useNavigate} from "react-router-dom";

const TopNav = () => {
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const NavButton = ({text, icon, onClick}: { text: string, icon: JSX.Element, onClick: () => void }) => {
        return (
            <button
                onClick={onClick}
                className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-md border border-gray-200 hover:bg-gray-100 transition">
                <span className="mr-2">{icon}</span>
                {text}
            </button>
        );
    }

    const handleRegisterSeminar = () => {
        navigate('/dashboard/seminars/register');
    }

    const handleLogout = () => {
        dispatch({type: 'SIGNOUT_REQUEST'});
        toast.info("Logged out :)");
    }

    const fullName = `${user?.firstName} ${user?.lastName}`;

    return (
        <div className="sticky top-0 flex justify-between items-center bg-white p-6 shadow-md h-16 relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-white z-10"></div>
            <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">Seminar Mgmt. Portal</p>
            </div>
            <div className="flex w-1/2 flex-1 items-center justify-end space-x-4">
                <NavButton
                    text="Register for a Seminar"
                    icon={<FaPlus size={18}/>}
                    onClick={handleRegisterSeminar}
                />
                <div className={"cursor-pointer"}>
                    <p className="text-sm font-semibold">{fullName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <img
                    src="https://i.pravatar.cc/300"
                    alt="User Avatar" className="w-10 h-10 rounded-full"/>
                <NavButton
                    text=""
                    icon={<LuLogOut size={18}/>}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default TopNav;