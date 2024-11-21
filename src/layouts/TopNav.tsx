import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../state/hooks.ts";
import {LuLogOut} from "react-icons/lu";
import React from "react";
import {IMAGES} from "../assets/images.ts";

const TopNav = () => {
    const {user, loading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const NavButton = ({text, icon, onClick, ...props}: {
        text: string,
        icon: React.ReactNode,
        onClick: () => void,
        [key: string]: any
    }) => {
        return (
            <button
                onClick={onClick}
                className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-md border border-gray-200 hover:bg-gray-100 transition"
                {...props}
            >
                <span className="mr-2">{icon}</span>
                {text}
            </button>
        );
    }

    const handleRegisterSeminar = () => {
        // window.location.href = "/dashboard/seminars/register";
        // window.location.reload();
    }

    const handleLogout = () => {
        dispatch({type: 'SIGNOUT_REQUEST'});
        toast.info("Logged out :)");
    }

    return (
        <div className="sticky top-0 flex justify-between items-center bg-white p-6 shadow-md h-16 relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-white z-10"></div>
            <div className="flex items-center space-x-4">
                <img src={IMAGES.Cronus} alt="Logo" className="h-10 mr-2 saturate-200"/>
                <p className="text-lg font-semibold text-gray-900">Seminar Mgmt. Portal</p>
            </div>
            <div className="flex w-1/2 flex-1 items-center justify-end space-x-4">
                {/*<NavButton*/}
                {/*    disabled={loading}*/}
                {/*    text="Register for a Seminar"*/}
                {/*    icon={<FaPlus size={18}/>}*/}
                {/*    onClick={handleRegisterSeminar}*/}
                {/*/>*/}
                <div className={"cursor-pointer text-left"}>
                    <p className="text-sm font-semibold">{user?.name || "<<#FULLNAME!>>"}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <img
                    src="https://i.pravatar.cc/300"
                    alt="User Avatar" className="w-10 h-10 rounded-full"/>
                <NavButton
                    disabled={loading}
                    text=""
                    icon={<LuLogOut size={18}/>}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default TopNav;