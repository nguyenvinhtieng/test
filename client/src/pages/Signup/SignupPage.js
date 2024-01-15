import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import './SignupPage.css'; 

const SignupPage = ({ onSignup }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('/signup', values);
      onSignup(response.data.user);
    } catch (error) {
      console.error('Failed to signup', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Signup</h2>
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
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;