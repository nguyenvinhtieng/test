import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Menu mode="vertical" theme="light" className="sidebar-menu">
        <Menu.Item key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/auth/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link to="/auth/signup">Signup</Link>
        </Menu.Item>
        <Menu.Item key="projects">
          <Link to="/projects">Projects</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;