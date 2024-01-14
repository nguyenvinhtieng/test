import React from 'react';
import { Outlet } from 'react-router-dom';

import './styles.css';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      
      <div className="item content-page">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout;