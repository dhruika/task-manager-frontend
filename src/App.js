import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import PrivateRoute from "./utils/PrivateRoute";
import './App.css';
import Profile from "./pages/Profile";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
