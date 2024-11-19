import MainSidebar from './MainSidebar.tsx';
import TopNav from './TopNav.tsx';
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex h-full">
                {/* Main Sidebar with icons */}
                <MainSidebar/>

                {/* Main content area */}
                <div className="mainContent flex-1 flex flex-col h-screen">
                    {/* Top Navigation */}
                    <TopNav/>

                    {/* Content area */}
                    <div
                        className="dashContent overflow-auto flex-1 w-full flex flex-col justify-start h-0 items-start text-left p-12 bg-gray-100">
                        <Outlet/> {/* Nested routes will render here */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
