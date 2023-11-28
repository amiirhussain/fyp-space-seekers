import React from 'react';
import { Form, Input, Select, Button, message, Row, Modal } from 'antd';
import '../styles/userProfile.css';
import {
  BiMailSend,
  BiPhoneCall,
  BiPhone,
  BiReset,
  BiEdit,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';

const { Option } = Select;

const UserInfo = ({
  userData,
  passwordError,
  passwordModal,
  setPasswordModal,
  profileModal,
  setProfileModal,
  resetPassword,
  form,
  onFinish,
}) => {
  return (
    <>
      <div className="user--profile">
        <div className="edit">
          <BiEdit className="icon" onClick={() => setProfileModal(true)} />
        </div>
        <div className="user--details">
          <img src={userData.profileImage} alt="" className="user--image" />
          <div className="user--info">
            <h2 className="user-name">{userData.fullName}</h2>
            <span className="user--qualification">
              {userData.userType}, {userData.education}
            </span>
            <span className="user--year">2020 to 2024</span>
            <Link
              className="reset--password"
              onClick={() => setPasswordModal(true)}
            >
              <BiReset className="icon" />
              Reset Password
            </Link>
          </div>
        </div>

        <div className="user--contact">
          <Row className="row">
            <span className="email">
              <BiMailSend className="icon" /> {userData.email}
            </span>
            <span className="phone">
              <BiPhoneCall className="icon" />
              {userData.phone}
            </span>
          </Row>
          <Row className="row">
            <span className="emergency">
              <BiPhone className="icon" />
              0926123456
            </span>
          </Row>
        </div>
      </div>
      {/* // reset passoword Modal */}
      <Modal
        title="Reset Password"
        open={passwordModal}
        onOk={() => setPasswordModal(false)}
        onCancel={() => setPasswordModal(false)}
      >
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={resetPassword}
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

          {passwordError && (
            <p style={{ color: 'red', marginBottom: '10px' }}>
              {passwordError}
            </p>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/*  update user detail */}
      <Modal
        title="Edit User Profile"
        centered
        open={profileModal}
        onOk={() => setProfileModal(false)}
        onCancel={() => setProfileModal(false)}
        width={1000}
      >
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
            <Form.Item label="Profile Image" name="profileImage">
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Education" name="education">
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="userType"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: 'Please select the User type',
                },
              ]}
            >
              <Select
                size="large"
                value={'Select User Type'}
                placeholder="Select User Type"
                style={{ width: 300 }}
              >
                <Option value="Student">Student</Option>
                <Option value="Working Professional">
                  Working Profeesional
                </Option>
                <Option value="Individual">Individual</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserInfo;
