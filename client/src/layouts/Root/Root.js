import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './styles.css';

const RootLayout = () => {
  return (
    <div className="container-root-layout">
            <Sidebar />
      <div className="container-page">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout;