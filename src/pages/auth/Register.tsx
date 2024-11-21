import React from "react";
import {Form, useNavigate, useOutletContext} from "react-router-dom";
import {InputField} from "../../components/base/Inputs";
import Button from "../../components/base/Button.tsx";
import {FaUserPlus} from "react-icons/fa";
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
        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;

        if (!username || !password) {
            handleAuthError("You must provide both a username and password.");
            return;
        }
        flushSync(() => setIsRegistering(true));

        try {
            const userResponse = await authService.register({
                username,
                password,
                email,
                name: `${firstName} ${lastName}`,
            });
            const success = !!userResponse.data?.username;
            flushSync(() => setIsRegistering(false));
            if (!success) {
                handleAuthError("Registration failed. Please try again.");
                return;
            }
            toast.success("Registration successful! You can now log in.");
            setTimeout(() => navigate("/auth/login"), 0);
        } catch (error: any) {
            flushSync(() => setIsRegistering(false));
            handleAuthError(error.message);
        }
    };

    const handleLoginLinkClick = () => {
        navigate("/auth/login");
    }

    return (
        <div
            className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full before:content-['CRONUS'] before:absolute before:top-[-19%] before:left-[-5%] before:text-9xl before:font-gothic before:text-white before:opacity-10 before:rotate-[-0deg]">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-baseline justify-between px-4 py-4">
                    <h1 className="text-left text-2xl font-semibold text-gray-800">Join us.</h1>
                    <p className="text-left text-gray-600 mt-2">
                        Please register to create your account.
                        <br/><br/>
                        <strong>Seminar Management System</strong>
                        <br/>
                        <>by&nbsp;</>
                        <>CRONUS International Ltd.</>
                    </p>
                </div>
                <div className="lg:w-1/2">
                    <Form method="post" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <InputField id="firstName" label="First Name" name="firstName" placeholder="John"
                                            required/>
                                <InputField id="lastName" label="Last Name" name="lastName" placeholder="Doe" required/>
                            </div>
                            <InputField type="text" id="username" label="Username" name="username" placeholder="johndoe"
                                        required/>
                            <InputField type="email" id="email" label="Email" name="email"
                                        placeholder="johndoe@example.com" required/>
                            <InputField type="password" id="password" label="Password" name="password" required/>
                            <Button type="submit" variant="primary" fullWidth icon={<FaUserPlus/>} alignment="center"
                                    iconPosition="left" disabled={isRegistering}>
                                {isRegistering ? "Registering..." : "Register"}
                            </Button>
                            <p className="text-center text-gray-600">
                                Already have an account?
                                <a href="#" onClick={handleLoginLinkClick}>
                                    Log in here
                                </a>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;