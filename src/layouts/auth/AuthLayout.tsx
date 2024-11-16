import {Outlet} from "react-router-dom";
import React from "react";

function AuthLayout() {
    const [authError, setAuthError] = React.useState<string | null>(null);

    const handleAuthError = (error: string) => {
        setAuthError(error);
    };

    return (
        <div>
            {authError && <p style={{color: "red"}}>{authError}</p>}
            <Outlet context={{handleAuthError}}/>
        </div>
    );
}

export default AuthLayout;