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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            {authError && <p style={{color: "red"}}>{authError}</p>}
            <div
                className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full shadow-2xl before:content-['CRONUS'] before:absolute before:top-[-33%] before:left-[-5%] before:text-9xl before:font-gothic before:text-white before:opacity-10 before:rotate-[-0deg]">
                <Outlet context={{handleAuthError}}/>
            </div>
        </div>
    );
}

export default AuthLayout;