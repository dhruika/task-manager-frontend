
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣  REGISTER user  (URL changed: /register)
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
            });

            // 2️⃣  Immediately LOG IN with the same creds
            const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            // 3️⃣  Save token and go to dashboard
            localStorage.setItem("token", loginRes.data.token);
            navigate("/");
        } catch (err) {
            console.error("Signup error:", err.response || err);
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">Sign Up</button>
            </form>

            <p>
                Already have an account?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                >
                    Log in
                </span>
            </p>
        </div>
    );
}
