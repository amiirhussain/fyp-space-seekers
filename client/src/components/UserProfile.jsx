import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';

// ...

const UserProfile = () => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({}); // Change from [] to {}
  const userID = userData._id;

  const [form] = Form.useForm();

  console.log('User ID:', userID);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const res = await fetch('http://localhost:1337/user/single-user', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'x-access-token': token,
          },
        });

        if (res.status === 404) throw new Error('User not found');

        if (res.status === 200) {
          const data = await res.json();
          setUserData(data);
          console.log('Data Fetched:', data);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    getUserProfile();
  }, [token]);

  console.log('UserData:', userData);

  const onFinish = async (values) => {
    try {
      const res = await fetch(`http://localhost:1337/user/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(values),
      });

      if (res.status === 404) {
        console.error('User not found');
        message.error('User not found');
      } else if (res.status === 200) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        message.success('User updated successfully');
      } else {
        const errorData = await res.json();
        message.error(errorData.message);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        phone: userData.phone,
        education: userData.education,
        address: userData.address,
      });
    }
  }, [userData]);

  return (
    <div>
      <h1>User Profile</h1>
      {userData && (
        <Form
          form={form}
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={onFinish}
        >
          <Form.Item label="Email" name="email">
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item label="Full Name" name="fullName">
            <Input size="large" />
          </Form.Item>

          <Form.Item label="User Name" name="userName">
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Education" name="education">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UserProfile;
