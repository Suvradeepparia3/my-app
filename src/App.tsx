import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
