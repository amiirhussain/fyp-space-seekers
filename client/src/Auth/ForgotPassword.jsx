// ForgotPassword.js
import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {};

  return (
    <div className="form--container">
      <Card title="Forgot Password" bordered={false} style={{ width: 400 }}>
        <Form className="form" onFinish={handleResetPassword}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not a valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
