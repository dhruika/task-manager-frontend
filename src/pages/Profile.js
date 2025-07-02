import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 1️⃣ moved token inside the effect so ESLint sees it as a dependency
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;                     // 👉 NEW guard: skip fetch if no token

        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Fetched user:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);                                    // 2️⃣ no ESLint warning now

    if (!user) return <h3 style={{ textAlign: "center" }}>Loading profile...</h3>;

    return (
        <div style={{ textAlign: "center", padding: "30px" }}>
            <h2>My Profile</h2>
            {user.profilePic && (
                <img
                    src={`http://localhost:5000/${user.profilePic}`}
                    alt="Profile"
                    style={{
                        width: "150px",
                        borderRadius: "50%",
                        border: "3px solid #007bff",
                        marginBottom: "15px",
                    }}
                />
            )}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => navigate("/")}>Back to Dashboard</button>
        </div>
    );
}

export default Profile;
