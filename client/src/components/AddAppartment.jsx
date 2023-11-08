import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Checkbox, message } from 'antd';

const { Option } = Select;

const AddAppartment = () => {
  const [open, setOpen] = useState(false);
  const [userToken] = useState(localStorage.getItem('token'));

  const handleSubmit = (values) => {
    fetch('http://localhost:1337/apartment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        message.success('Apartment Added successfully');
      })
      .catch((error) => {
        console.error('Error creating apartment:', error);
      });
  };
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Apartment
      </Button>
      <Modal
        title="List Apartment"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <Form
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{ marginTop: '2rem' }}
          name="register-form"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: 'Please select the type',
              },
            ]}
          >
            <Select value={'Select Type'} style={{ width: 160 }}>
              <Option value="Room">Room</Option>
              <Option value="House/Flat">House / Flat</Option>
              <Option value="Hostel">Hostel</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title',
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image Link"
            rules={[
              {
                required: true,
                message: 'Please input the Image Link',
              },
            ]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please input the address',
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[
              {
                required: true,
                message: 'Please input the size',
              },
            ]}
          >
            <Input placeholder="Size" />
          </Form.Item>
          <Form.Item
            name="bedrooms"
            label="Bedrooms"
            rules={[
              {
                required: true,
                message: 'Please input the number of bedrooms',
              },
            ]}
          >
            <Input placeholder="Bedrooms" />
          </Form.Item>
          <Form.Item
            name="bathrooms"
            label="Bathrooms"
            rules={[
              {
                required: true,
                message: 'Please input the number of bathrooms',
              },
            ]}
          >
            <Input placeholder="Bathrooms" />
          </Form.Item>

          <Form.Item
            name="furnished"
            label="Furnished?"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item name="parking" label="Parking?" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddAppartment;
