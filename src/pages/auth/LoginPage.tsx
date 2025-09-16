import "./Login.css";
import { useState } from "react";

export default function LogIn() {
    const [isSignUp, setIsSignUp] = useState(false);
    // error messages for sign up
    const [messages, setMessages] = useState<string[]>([]);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    function submitSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessages([]);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries()) as {
            username_up: string;
            email_up: string;
            password_up: string;
        };

        // some front end validation
        const username = data.username_up?.trim() || "";
        const email = data.email_up?.trim() || "";
        const password = data.password_up?.trim() || "";

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            setMessages((prev) => [
                ...prev,
                "Username must only contain letters and numbers ",
            ]);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            messages.push("Please enter a valid email address");
        }
        if (password.length < 5 || password.length > 12) {
            setMessages((prev) => [
                ...prev,
                "Password must be between 5 and 12 characters",
            ]);
        }
        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            setMessages((prev) => [
                ...prev,
                "Password must contain at least one letter and one number",
            ]);
        }

        if (messages.length !== 0) {
            // do not create account
            return;
        } else {
            console.log("Sign Up:", data);
            // create account in backend
            event.currentTarget.reset();
        }
    }
    console.log(messages);

    function submitSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Sign In:", data);
        event.currentTarget.reset();

        // fetch from backend to check if user exists
        // try catch block- react-loader-spinner incase of wait?
        // if succesful fetch gameState and move to game screen
    }

    return (
        <div className="bg">
            <div className={`form-box ${isSignUp ? "active" : ""}`}>
                {/* sign in */}
                <form className="form sign-in-form" onSubmit={submitSignIn}>
                    <h2 className="form__header ">CODE FOR YOUR LIFE</h2>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Username"
                        name="username_in"
                        required
                    />
                    <input
                        className="form__input"
                        type="password"
                        placeholder="Password"
                        name="password_in"
                        required
                    />
                    <button type="submit" className="form__btn">
                        Login
                    </button>
                    <p className="toggle-form toggle-form__up">
                        Don't have an account?{" "}
                        <span
                            className="toggle-form__link"
                            onClick={toggleForm}
                        >
                            Sign Up
                        </span>
                    </p>
                </form>

                {/* sign up */}
                <form className="form sign-up-form" onSubmit={submitSignUp}>
                    <h2 className="form__header ">CODE FOR YOUR LIFE</h2>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Username"
                        name="username_up"
                        required
                    />
                    <input
                        className="form__input"
                        type="email"
                        placeholder="Email"
                        name="email_up"
                        required
                    />
                    <input
                        className="form__input"
                        type="password"
                        placeholder="Password"
                        name="password_up "
                        required
                    />
                    <button type="submit" className="form__btn">
                        Register
                    </button>

                    {messages.length > 0 && (
                        <p className="error-messages">{messages.join(",")}</p>
                    )}

                    <p className="toggle-form toggle-form__in">
                        Been here before?{" "}
                        <span
                            className="toggle-form__link"
                            onClick={toggleForm}
                        >
                            Sign In
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
