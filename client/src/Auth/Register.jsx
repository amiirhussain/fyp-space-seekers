import React, { useState } from 'react';
import { Button, Form, Input, Card, message, Row, Space } from 'antd';
import '../styles/auth.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordValidator =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!passwordValidator.test(values.password)) {
      setPasswordError(
        'Password must be at least 6 characters and include at least one number, one alphabet character, and one special character',
      );
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
          width: 500,
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
          <div style={{ display: 'flex ', justifyContent: 'space-between' }}>
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
              <Input size="large" placeholder="User name" />
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
              <Input size="large" placeholder="Full name" />
            </Form.Item>
          </div>

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
            <Input size="large" placeholder="Email" />
          </Form.Item>
          {emailError && (
            <p style={{ color: 'red', marginBottom: '10px' }}>{emailError}</p>
          )}

          <div
            style={{
              display: 'flex ',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
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
              <Input.Password size="large" placeholder="Password" />
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
              <Input.Password size="large" placeholder="Confirm Password" />
            </Form.Item>
          </div>

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
