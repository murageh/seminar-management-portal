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
            <Outlet context={{handleAuthError}}/>
            {/*{authError &&*/}
            {/*    <p className="w-full max-w-3xl text-center bg-white text-red-700 px-4 py-2 rounded-lg">*/}
            {/*        {authError}*/}
            {/*    </p>*/}
            {/*}*/}
        </div>
    );
}

export default AuthLayout;