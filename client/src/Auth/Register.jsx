import React, { useState } from 'react';
import { Button, Form, Input, Card, message, Row, Space } from 'antd';
import '../styles/auth.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        message.success('Registration successful');
        navigate('/login');
      } else if (response.status === 400) {
        setEmailError('User already registered');
        message.error('User Already registered');
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setPasswordError('');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form--container">
      <Card
        title="Register"
        bordered={false}
        style={{
          width: 400,
        }}
      >
        <Form
          layout="vertical"
          className="form"
          name="register-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space style={{ display: 'flex !important' }}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your User name',
                },
              ]}
            >
              <Input placeholder="User name" />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Full name!',
                },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
          </Space>

          <Form.Item
            name="email"
            label="Email"
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
            <Input placeholder="Email" />
          </Form.Item>
          {emailError && (
            <p style={{ color: 'red', marginBottom: '10px' }}>{emailError}</p>
          )}

          <Space style={{ display: 'flex !important' }}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Space>

          {passwordError && (
            <p style={{ color: 'red', marginBottom: '10px' }}>
              {passwordError}
            </p>
          )}

          <Form.Item style={{ marginTop: '2rem' }}>
            <Button
              size="large"
              className="form-btn"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
          {/* <Form.Item>
            <Button
              size="large"
              className="form-btn btn-google"
              htmlType="submit"
            >
              Signup with Google
            </Button>
          </Form.Item> */}
          <p style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login"> Login Now </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
