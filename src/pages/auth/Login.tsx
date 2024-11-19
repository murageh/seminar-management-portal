import React, {useState} from "react";
import {Form, useNavigate, useOutletContext} from "react-router-dom";
import {InputField} from "../../components/base/Inputs";
import Button from "../../components/base/Button.tsx";
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../state/hooks.ts";
import {setToken} from "../../state/features/authSlice.ts";
import * as authService from "../../services/authService.ts";
import {flushSync} from "react-dom";

function LoginPage() {
    const {handleAuthError} = useOutletContext<{ handleAuthError: (error: string) => void }>();
    const [{isAuthenticated, isLoading}, setIsAuthenticated] = useState({isAuthenticated: false, isLoading: false});
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            handleAuthError("You must provide both a username and password.");
            return;
        }
        flushSync(() => setIsAuthenticated({isAuthenticated: false, isLoading: true}));

        try {
            const userResponse = await authService.login({username, password});
            const success = !!userResponse.data?.token;
            flushSync(() => setIsAuthenticated({isAuthenticated: success, isLoading: false}));
            if (!success) {
                handleAuthError("Login failed. Please check your credentials and try again.");
                return;
            }
            dispatch(setToken(userResponse.data));
            toast.success("Login successful!");
            setTimeout(() => navigate("/dashboard"), 990);
        } catch (error: any) {
            flushSync(() => setIsAuthenticated({isAuthenticated: false, isLoading: false}));
            handleAuthError(error.message || error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-baseline justify-between px-4 py-4">
                <h1 className="text-left text-2xl font-semibold text-gray-800">Welcome back.</h1>
                <p className="text-left text-gray-600 mt-2">Please log in to continue to the<br/><strong>Seminar
                    Management dashboard.</strong></p>
            </div>
            <div className="lg:w-1/2">
                <Form method="post" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <InputField id="username" label="Username" name="username" required/>
                        <InputField id="password" label="Password" name="password" type="password" required/>
                        <Button type="submit" variant="primary" fullWidth icon={<FaSignInAlt/>} alignment="center"
                                iconPosition="left" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;