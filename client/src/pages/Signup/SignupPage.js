import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './SignupPage.css';
import { Link } from 'react-router-dom';

const SignupPage = ({ onSignup }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('/signup', values);
      onSignup(response.data.user);

      localStorage.setItem('signupUser', JSON.stringify(response.data.user));

      message.success('Signup successful!');

      form.resetFields();
    } catch (error) {
      console.error('Failed to signup', error);
      message.error('Signup failed. Please try again.');
    }

    setLoading(false);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <h2>Signup</h2>
      <Form form={form} onFinish={handleSubmit}>
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
        <div className="back-to-home">
          <Link to="/home">Back to Home</Link>

        </div>
      </Form>
      
    </div>
  );
};

export default SignupPage;