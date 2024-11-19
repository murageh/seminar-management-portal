import {FaBars, FaHouse, FaRegRectangleList, FaUser, FaUserTie} from "react-icons/fa6";
import React from "react";
import {useNavigate} from "react-router-dom";
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
    const [selected, setSelected] = React.useState<string | null>("/dashboard");
    const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const MenuItems: MenuItem[] = [
        {
            icon: <FaHouse/>,
            label: "Dashboard",
            link: "/dashboard"
        },
        {
            icon: <FaRegRectangleList/>,
            label: "Seminars",
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
                },
                {
                    icon: <FaUser/>,
                    label: "Customers",
                    link: "/dashboard/customers",
                }
            ]
        }
    ];

    const MenuButton = ({children, link, label}: { children: React.ReactNode, link: string, label: string }) => {
        return (
            <button
                onClick={() => {
                    navigate(link);
                    return setSelected(link);
                }}
                title={label}
                className={`w-full px-2 h-12 flex items-center justify-${isExpanded ? 'start' : 'center'} gap-4 rounded-md text-${selected === link ? 'primary' : 'slate-900'} bg-transparent hover:bg-blue-700`}>
                {
                    React.cloneElement(children as React.ReactElement, {
                        size: 24,
                        className: `text-${selected === link ? 'primary' : 'slate-900'} font-normal`
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