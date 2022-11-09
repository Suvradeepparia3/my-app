import React, { useEffect, useState } from "react";
import "../App.css";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";

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
