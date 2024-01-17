import React, { useEffect } from "react";
import { Button } from "antd";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    console.log("HOME LOG ok");
  }, []);
  return (
    <div className="homepage-container">
      <h2 className="homepage-heading">Welcome to the Home Page</h2>
      <div className="homepage-buttons">
        <Button type="primary" href="/auth/login">
          Login
        </Button>
        <Button type="primary" href="/auth/signup">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
