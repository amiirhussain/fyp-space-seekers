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

const { Option } = Select;

const UserPersonalDetail = ({
  userData,
  personalModal,
  setPersonalModal,
  onFinish,
  form,
}) => {
  return (
    <>
      <div className="personal--detail">
        <div className="user--header">
          <h2>Personal Details</h2>
          <BiEdit className="icon" onClick={() => setPersonalModal(true)} />
        </div>

        <Modal
          title="Edit Personal Details"
          centered
          open={personalModal}
          onOk={() => setPersonalModal(false)}
          onCancel={() => setPersonalModal(false)}
          width={1000}
        >
          {userData && (
            <Form
              form={form}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select the Gender',
                  },
                ]}
              >
                <Select
                  size="large"
                  value={'Select User Gender'}
                  placeholder="Select User Gender"
                  style={{ width: 150 }}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Date Of Birth" name="dob">
                <input type="date" className="date" />
              </Form.Item>
              <Form.Item label="Blood Group" name="bloodGroup">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Permanent Address" name="perAddress">
                <Input size="large" />
              </Form.Item>

              <Form.Item label="Residential Address" name="resAddress">
                <Input size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>

        <div className="personal--info">
          <div className="info">
            <div className="info-col">
              <div className="gender">
                <h4>Gender</h4>
                <span>{userData.gender ? userData.gender : 'NA'}</span>
              </div>
              <div className="blood-group">
                <h4>Blood Group</h4>
                <span>{userData.bloodGroup ? userData.bloodGroup : 'NA'}</span>
              </div>
            </div>
            <div className="info-col">
              <div className="dob">
                <h4>Date Of Birth</h4>
                <span>{userData.dob ? userData.dob : 'NA'}</span>
              </div>

              <div className="reg-email">
                <h4>Registered Email</h4>
                <span>{userData.email ? userData.email : 'NA'}</span>
              </div>
            </div>
          </div>

          <div className="address">
            <h4>Permanent Address</h4>

            <span className="permanent-address">
              {userData.perAddress ? userData.perAddress : 'NA'}
            </span>
          </div>
          <div className="address">
            <h4>Resdential Address</h4>
            <span className="residential-address">
              {userData.resAddress ? userData.resAddress : 'NA'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPersonalDetail;
