import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Messaging from "./pages/Messaging";
import Project from "./pages/Project";
import Devices from "./pages/Devices";
import DevGallery from "./pages/DevGallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/project" element={<Project />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/dev-gallery" element={<DevGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
