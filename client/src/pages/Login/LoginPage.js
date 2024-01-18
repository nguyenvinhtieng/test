import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin, signedUpAccounts }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const { email, password } = values;

      // Check if the provided credentials match any signed-up account
      const matchedAccount = signedUpAccounts.find(
        (account) => account.email === email && account.password === password
      );

      if (matchedAccount) {
        // Simulating a server response delay with setTimeout
        setTimeout(() => {
          onLogin(matchedAccount);
          message.success('Login successful!');
        }, 1000);
      } else {
        message.error('Invalid email or password');
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