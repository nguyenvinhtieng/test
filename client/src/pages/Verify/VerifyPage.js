import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const VerifyPage = ({ onVerify }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('/verify', values);
      onVerify(response.data.user);
    } catch (error) {
      console.error('Failed to verify email', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="verificationCode"
          rules={[
            { required: true, message: 'Please enter the verification code' },
          ]}
        >
          <Input placeholder="Verification Code" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyPage;