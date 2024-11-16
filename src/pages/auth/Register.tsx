import React from "react";
import {Form, useNavigate, useOutletContext} from "react-router-dom";
import {InputField} from "../../components/base/Inputs";
import Button from "../../components/base/Button.tsx";
import {FaUserPlus} from "react-icons/fa";
import {setUser} from "../../state/features/authSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../state/hooks.ts";
import * as authService from "../../services/authService.ts";
import {flushSync} from "react-dom";

function RegisterPage() {
    const {handleAuthError} = useOutletContext<{ handleAuthError: (error: string) => void }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isRegistering, setIsRegistering] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            handleAuthError("You must provide both a username and password.");
            return;
        }
        flushSync(() => setIsRegistering(true));

        try {
            const userResponse = await authService.register({
                username,
                password,
                email: "",
                firstName: "",
                lastName: "",
                title: null
            });
            const success = !!userResponse.data?.username;
            flushSync(() => setIsRegistering(false));
            if (!success) {
                handleAuthError("Registration failed. Please try again.");
                return;
            }
            dispatch(setUser(userResponse.data));
            toast.success("Registration successful!");
            setTimeout(() => navigate("/dashboard"), 0);
        } catch (error: any) {
            flushSync(() => setIsRegistering(false));
            handleAuthError(error.message);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-baseline justify-between px-4 py-4">
                <h1 className="text-left text-2xl font-semibold text-gray-800">Join us.</h1>
                <p className="text-left text-gray-600 mt-2">Please register to create your account.</p>
            </div>
            <div className="lg:w-1/2">
                <Form method="post" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <InputField id="username" label="Username" name="username" required/>
                        <InputField id="password" label="Password" name="password" type="password" required/>
                        <Button type="submit" variant="primary" fullWidth icon={<FaUserPlus/>}
                                alignment="center" iconPosition="left" disabled={isRegistering}>
                            {isRegistering ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;