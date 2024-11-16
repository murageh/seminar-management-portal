import {Form, useOutletContext} from "react-router-dom";

function RegisterPage() {
    const {handleAuthError} = useOutletContext<{ handleAuthError: (error: string) => void }>();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string;

        if (!username) {
            handleAuthError("You must provide a username to register");
            return;
        }

        // Perform registration logic here
        // If registration fails, call handleAuthError with the error message
    };

    return (
        <div>
            <h2>Register</h2>
            <Form method="post" onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username"/>
                </label>
                <button type="submit">Register</button>
            </Form>
        </div>
    );
}

export default RegisterPage;