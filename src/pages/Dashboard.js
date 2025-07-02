import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch tasks");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const filteredTasks =
        filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Task Dashboard</h2>

            <div className="filters">
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Pending")}>Pending</button>
                <button onClick={() => setFilter("Completed")}>Completed</button>
                <button onClick={() => navigate("/add")}>Add Task</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => navigate("/profile")}>My Profile</button>

            </div>

            {filteredTasks.map((task) => (
                <div className="task-card" key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due: {task.dueDate?.substring(0, 10)}</p>
                    <p className={`task-status ${task.status.toLowerCase()}`}>{task.status}</p>
                    <button onClick={() => navigate(`/add?id=${task._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
