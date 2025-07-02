import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [taskId, setTaskId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");

        if (id) {
            setTaskId(id);
            fetchTask(id);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchTask = async (id) => {
        try {
            const res = await axios.get("http://localhost:5000/api/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const taskToEdit = res.data.find((t) => t._id === id);
            if (taskToEdit) {
                setTitle(taskToEdit.title);
                setDescription(taskToEdit.description);
                setDueDate(taskToEdit.dueDate?.substring(0, 10));
                setStatus(taskToEdit.status);
            }
        } catch (err) {
            alert("Failed to load task for editing");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = { title, description, dueDate, status };

        try {
            if (taskId) {
                await axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Task updated");
            } else {
                await axios.post("http://localhost:5000/api/tasks", taskData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Task added");
            }

            navigate("/");
        } catch (err) {
            alert("Task submission failed");
        }
    };

    return (
        <div>
            <h2>{taskId ? "Edit Task" : "Add Task"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit">{taskId ? "Update" : "Add"} Task</button>
            </form>
        </div>
    );
}

export default AddTask;
