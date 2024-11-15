import {FaHouse, FaRegRectangleList, FaUser, FaUserTie} from "react-icons/fa6";
import React from "react";
import {toast} from "react-toastify";

const MainSidebar = () => {
    const [selected, setSelected] = React.useState<string | null>("/analytics");

    const MenuItems = [
        {
            icon: <FaHouse/>,
            label: "Dashboard",
            link: "/dashboard"
        },
        {
            icon: <FaRegRectangleList/>,
            label: "Seminars",
            link: "/seminars"
        }
        ,
        {
            icon: <FaUserTie/>,
            label: "Employees",
            link: "/employees"
        }
        ,
        {
            icon: <FaUser/>,
            label: "Customers",
            link: "/customers"
        }
    ];

    const Button = ({children, link, label}: { children: React.ReactNode, link: string, label: string }) => {
        return (
            <button
                onClick={() => {
                    toast.success(`Navigating to ${link}`);
                    // TODO: Do actual navigation
                    return setSelected(link);
                }}
                title={label}
                className={`w-12 h-12 flex items-center justify-center rounded-md text-${selected === link ? 'primary' : 'slate-900'} bg-transparent hover:bg-blue-700`}>
                {
                    React.cloneElement(children as React.ReactElement, {
                        size: 24,
                        className: `text-${selected === link ? 'primary' : 'slate-900'} font-normal`
                    })
                }
            </button>
        );
    }

    return (
        <div className="w-16 h-screen bg-white shadow-lg flex flex-col items-center justify-center py-4 space-y-4">
            {/* Sidebar icons */}
            {MenuItems.map((item, index) => (
                <Button key={index} link={item.link} label={item.label}>
                    {item.icon}
                </Button>
            ))}
        </div>
    );
};

export default MainSidebar;