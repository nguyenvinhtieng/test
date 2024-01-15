import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import "./HomePage.css";

const HomePage = ({ onLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await axios.post("/logout");
      onLogout();
    } catch (error) {
      console.error("Failed to logout", error);
    }

    setLoading(false);
  };

  return (
    <div className="homepage-container">
      <h2 className="homepage-heading">Welcome to the Home Page</h2>
      {/* <Button type="primary" onClick={handleLogout} loading={loading}>
        Logout
      </Button> */}
    </div>
  );
};

export default HomePage;
