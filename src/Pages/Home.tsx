import React, { useEffect, useState } from "react";
import "../App.css";
import "antd/dist/antd.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const call = () => {
      if (token) {
        return <>{navigate("/dashboard")}</>;
      }
    };
    call();
  }, [token, navigate]);
  return (
    <div>
      <img src="https://wallpaperaccess.com/full/917648.jpg" />
    </div>
  );
}

export default Home;
