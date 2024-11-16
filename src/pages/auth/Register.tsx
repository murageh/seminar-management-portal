import React from "react";
import {Form, useOutletContext} from "react-router-dom";
import {InputField} from "../../components/base/Inputs";
import Button from "../../components/base/Button.tsx";
import {FaUserPlus} from "react-icons/fa";
import {updateUser} from "../../state/features/authSlice.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../state/hooks.ts";

=

function RegisterPage() {
    const {handleAuthError} = useOutletContext<{ handleAuthError: (error: string) => void }>();
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

        // Simulate registration logic
        dispatch(updateUser({username}));
        toast.success("Registration successful!");
    };

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-1000 bg-gray-900`}>
            <div
                className={`relative bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full shadow-2xl before:content-['CRONUS'] before:absolute before:top-[-33%] before:left-[-5%] before:text-9xl before:font-gothic before:text-white before:opacity-10 before:rotate-[-0deg]`}>
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
                                        alignment="center" iconPosition="left">
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;