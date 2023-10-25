import React, {useEffect, useState} from "react";
import "./Login.css"

function Login({ handleLogin }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("https://localhost:7029/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ userName, password })
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const data = await response.json();
        
        handleLogin(data.accessToken)
    }
    

    return (
        <form onSubmit={handleSubmit} className="login-form-container">
            <h2>Login to your account</h2>

            <div className="login-input-parent">
                <label htmlFor="username">Username</label>
                <input
                    type="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    required
                />
            </div>

            <div className="login-input-parent">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>

            <button className="login-button" type="submit">Login</button>
        </form>
    );
}

export default Login;