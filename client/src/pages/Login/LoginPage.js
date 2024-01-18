import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../config/api.service';

const LoginPage = ({ onLogin, signedUpAccounts }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const {email, password} = values;
      const res = await apiService.post('/login', { username: email, password })
      const token = res.data.token;
      localStorage.setItem('token', token);
      message.success('Login successfully!');
      navigate('/projects');
    } catch (error) {
      const messageError = error?.response?.data?.msg;
      message.error(messageError || 'Failed to signin');
    }

    setLoading(false);
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-heading">Login</h2>

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input className="login-page-input" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password className="login-page-input" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button className="login-page-button" type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
        <div className="back-to-home">
          <Link to="/home">Back to Home</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;