import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Checkbox, message } from 'antd';
import useApartmentApi from '../hooks/useApartmentApi';
import ApartList from './ApartList';

const { Option } = Select;

const AddApartment = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const {
    apartments,
    loading,
    fetchUserApartments,
    addApartment,
    updateApartment,
    deleteApartment,
  } = useApartmentApi();

  const handleSuccess = () => {
    setOpen(false);
    message.success(
      editMode
        ? 'Apartment Updated successfully'
        : 'Apartment Added successfully',
    );
    fetchUserApartments();
  };

  const handleSubmit = (values) => {
    addApartment(values, () => {
      handleSuccess();
      form.resetFields();
    });
  };

  const handleEditSubmit = (values) => {
    if (editData) {
      updateApartment(editData._id, values, () => {
        handleSuccess();
        form.resetFields();
      });
    } else {
      console.error('Edit data is null');
    }
  };

  const handleDelete = (apartmentId) => {
    deleteApartment(apartmentId, handleSuccess);
  };

  const handleEdit = (apartment) => {
    setOpen(true);
    setEditMode(true);
    setEditData(apartment);
  };

  const handleOpenModal = () => {
    setOpen(true);
    setEditMode(false);
    setEditData(null);
    form.resetFields();
  };

  useEffect(() => {
    if (editMode && editData) {
      form.setFieldsValue({
        type: editData.type,
        title: editData.title,
        imageUrl:
          editData.imageUrls && editData.imageUrls.length > 0
            ? editData.imageUrls[0]
            : '',
        address: editData.address,
        size: editData.size,
        rent: editData.rent,
        bedrooms: editData.bedrooms,
        bathrooms: editData.bathrooms,
        furnished: editData.furnished,
        parking: editData.parking,
      });
    }
  }, [editMode, editData]);

  const [form] = Form.useForm();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: 'gray' }}>My Apartment List</h2>

        <Button type="primary" onClick={handleOpenModal}>
          Add Apartment
        </Button>
      </div>
      <Modal
        title={editMode ? 'Edit Apartment' : 'Add Apartment'}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          setEditMode(false);
          form.resetFields();
        }}
        width={800}
      >
        <Form
          form={form}
          style={{ marginTop: '2rem' }}
          name="register-form"
          onFinish={editMode ? handleEditSubmit : handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <div
            style={{
              display: 'flex ',
              gap: '10px',
              // justifyContent: 'space-between',
            }}
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
              <Select
                size="large"
                value={'Select Type'}
                placeholder="Select Type"
                style={{ width: 180 }}
              >
                <Option value="Room">Room</Option>
                <Option value="House/Flat">House / Flat</Option>
                <Option value="Hostel">Hostel</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please input the title',
                },
              ]}
            >
              <Input size="large" placeholder="Title" />
            </Form.Item>
          </div>
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
            <Input size="large" placeholder="Image URL" />
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
            <Input size="large" placeholder="Address" />
          </Form.Item>
          <div
            style={{
              display: 'flex ',
              gap: '10px',
              justifyContent: 'space-between',
            }}
          >
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
              <Input size="large" placeholder="Size" />
            </Form.Item>
            <Form.Item
              name="rent"
              label="Rent"
              rules={[
                {
                  required: true,
                  message: 'Please input the size',
                },
              ]}
            >
              <Input size="large" placeholder="Rent" />
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
              <Input size="large" placeholder="Bedrooms" />
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
              <Input size="large" placeholder="Bathrooms" />
            </Form.Item>
          </div>
          <div
            style={{
              display: 'flex ',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <Form.Item
              name="furnished"
              label="Furnished?"
              valuePropName="checked"
            >
              <Checkbox size="large" />
            </Form.Item>
            <Form.Item name="parking" label="Parking?" valuePropName="checked">
              <Checkbox size="large" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        {loading ? (
          <p>Loading apartments...</p>
        ) : (
          <ApartList
            apartments={apartments}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default AddApartment;
