import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../config/api.service';

const SignupPage = ({ onSignup }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await apiService.post('/sign-up', { email: values.email, password: values.password })
      message.success('Signup successfully! Login now!');
      navigate('/auth/login');
    } catch (error) {
      const messageError = error?.response?.data?.msg;
      message.error(messageError || 'Failed to signup');
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