import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './LoginPage.css'; 

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('/login', values);
      const { success, message: loginMessage, user } = response.data;

      if (success) {
        onLogin(user);
      } else {
        message.error(loginMessage);
      }
    } catch (error) {
      console.error('Failed to login', error);
      message.error('Failed to login');
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;