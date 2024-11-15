// import ThemeToggle from "./theme/ThemeToggle.tsx";

import {FaPlus} from "react-icons/fa6";
import {toast} from "react-toastify";

const TopNav = () => {
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

    return (
        <div className="sticky top-0 flex justify-between items-center bg-white p-6 shadow-md h-16">
            {/* Logo and/or title */}
            <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">Seminar Mgmt. Portal</p>
            </div>

            {/* Right side summary */}
            <div className="flex w-1/2 items-center justify-end space-x-4">
                {/* Add new seminar button */}
                <NavButton
                    text="Add New Seminar"
                    icon={<FaPlus size={18}/>}
                    onClick={() => toast.success("Add new seminar clicked")}
                />

                {/* Profile */}
                <div className={"cursor-pointer"}>
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-gray-500">Admin</p>
                </div>

                {/* Profile image */}
                <img
                    src="https://i.pravatar.cc/300"
                    alt="User Avatar" className="w-10 h-10 rounded-full"/>
            </div>
        </div>
    );
};

export default TopNav;
