import {FaBars, FaHouse, FaRegRectangleList, FaUserTie} from "react-icons/fa6";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Accordion from "../components/base/Accordion.tsx";

interface NormalMenuItem {
    icon: React.ReactNode;
    label: string;
    link: string;
    group?: false;
}

interface GroupMenuItem {
    group: true;
    label: string;
    children: NormalMenuItem[];
}

type MenuItem = NormalMenuItem | GroupMenuItem;

const MainSidebar = () => {
    const {pathname} = useLocation();
    const selected = pathname;

    const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const MenuItems: MenuItem[] = [
        {
            icon: <FaHouse/>,
            label: "My Registrations",
            link: "/dashboard"
        },
        {
            icon: <FaRegRectangleList/>,
            label: "Available Seminars",
            link: "/dashboard/seminars"
        },
        {
            group: true,
            label: "Extra BC functionality",
            children: [
                {
                    icon: <FaUserTie/>,
                    label: "Employees",
                    link: "/dashboard/employees",
                }
            ]
        }
    ];

    const MenuButton = ({children, link, label}: { children: React.ReactNode, link: string, label: string }) => {
        const isSelected = selected === link;

        return (
            <button
                onClick={() => navigate(link)}
                title={label}
                className={`w-full px-2 h-12 flex items-center justify-${isExpanded ? 'start' : 'center'} gap-4 rounded-md text-${isSelected ? 'primary font-bold' : 'slate-900'} bg-transparent hover:bg-blue-700 hover:text-white`}>
                {
                    React.cloneElement(children as React.ReactElement, {
                        size: 24,
                        className: `text-${isSelected ? 'primary' : 'slate-900'} font-normal`,
                        style: {color: 'currentColor'}
                    })
                }
                {isExpanded && <span className="ml-2">{label}</span>}
            </button>
        );
    }

    return (
        <div
            className={`mainSidebar h-screen bg-white shadow-lg flex flex-col items-${isExpanded ? 'start' : 'center'} justify-start py-4 px-4 space-y-4 ${isExpanded ? 'min-w-48 max-w-72' : 'w-16'} transition-all duration-500 ease-in-out`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-12 h-12 flex items-center justify-${isExpanded ? 'center' : 'center'} rounded-md bg-transparent hover:bg-blue-700`}>
                <FaBars size={24}/>
            </button>
            {MenuItems.map((item, index) => (
                item.group ? (
                    <Accordion key={index} title={item.label} theme="plain" collapsed={!isExpanded}>
                        {item.children.map((child, childIndex) => (
                            <MenuButton key={childIndex} link={child.link} label={child.label}>
                                {child.icon}
                            </MenuButton>
                        ))}
                    </Accordion>
                ) : (
                    <MenuButton key={index} link={item.link} label={item.label}>
                        {item.icon}
                    </MenuButton>
                )
            ))}
        </div>
    );
};

export default MainSidebar;