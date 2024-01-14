import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/Root/Root';
import AuthLayout from './layouts/Auth/Auth';
import HomePage from './pages/Homepage/HomePage';
import Login from './pages/Login/LoginPage';
import Signup from './pages/Signup/SignupPage';
import Verify from './pages/Verify/VerifyPage';


import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          {['', '/home'].map((item, idx) => <Route key={idx} path={item} element={<HomePage />} />)}
         
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} >
          <Route path='login' element={<Verify />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;