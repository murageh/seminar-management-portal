import {Outlet} from "react-router-dom";
import React from "react";
import {toast} from "react-toastify";

function AuthLayout() {
    const [authError, setAuthError] = React.useState<string | null>(null);

    const handleAuthError = (error: string) => {
        setAuthError(error);
        toast.error(error);
    };

    return (
        <div className="min-h-full flex flex-col gap-y-3 items-center justify-center bg-gray-900">
            <div
                className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full before:content-['CRONUS'] before:absolute before:top-[-33%] before:left-[-5%] before:text-9xl before:font-gothic before:text-white before:opacity-10 before:rotate-[-0deg]">
                <Outlet context={{handleAuthError}}/>
            </div>
            {/*{authError &&*/}
            {/*    <p className="w-full max-w-3xl text-center bg-white text-red-700 px-4 py-2 rounded-lg">*/}
            {/*        {authError}*/}
            {/*    </p>*/}
            {/*}*/}
        </div>
    );
}

export default AuthLayout;