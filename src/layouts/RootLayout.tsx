import {Outlet} from "react-router-dom";

function RootLayout() {
    return (
        <div id="rootLayout" className="w-full h-screen p-0 m-0">
            <Outlet/>
        </div>
    );
}

export default RootLayout;