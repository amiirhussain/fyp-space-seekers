import React from 'react';
import { Typography, Form, Input, Button, Row, Col, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  const onFinish = (values) => {
    // Handle form submission, e.g., send data to the server
    console.log('Form values:', values);
  };

  return (
    <section className="contact">
      <Row>
        <Col>
          <Space direction="vertical" size="large">
            <Title level={2}>Contact Us</Title>
            <Paragraph>
              Have questions or feedback? Reach out to us using the contact form
              below, and we'll get back to you as soon as possible.
            </Paragraph>
          </Space>

          <Form
            name="contact-form"
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: '400px' }}
          >
            <Form.Item
              label="Your Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Your Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Your Message"
              name="message"
              rules={[
                { required: true, message: 'Please enter your message!' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default ContactUs;
