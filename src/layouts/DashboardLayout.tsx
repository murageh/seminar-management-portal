import MainSidebar from './MainSidebar.tsx';
import TopNav from './TopNav.tsx';
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Main Sidebar with icons */}
                <MainSidebar/>

                {/* Main content area */}
                <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                    {/* Top Navigation */}
                    <TopNav/>

                    {/* Content area */}
                    <div className="flex-1 p-6 bg-gray-100">
                        <Outlet/> {/* Nested routes will render here */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
