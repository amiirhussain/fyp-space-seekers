import React, { useEffect, useState } from 'react';
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

const UserProfile = () => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const userID = userData._id;
  const [pofileModal, setPofileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [personalModal, setPersonalModal] = useState(false);
  const [preferenceModal, setPreferenceModal] = useState(false);

  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        setPofileModal(false);
        setPersonalModal(false);
        setPreferenceModal(false);
      } else {
        const errorData = await res.json();
        message.error(errorData.message);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const resetPassword = async (values) => {
    const isChangingPassword = values.password && values.confirmPassword;

    if (isChangingPassword) {
      if (values.password !== values.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      if (!passwordValidator.test(values.password)) {
        setPasswordError(
          'Invalid password format (8 characters minimum, at least one uppercase letter, one lowercase letter, one digit, and one special character)',
        );
        return;
      }
    }

    try {
      const res = await fetch(
        `http://localhost:1337/user/reset-password/${userID}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify(values),
        },
      );

      if (res.status === 404) {
        console.error('User not found');
        message.error('User not found');
      } else if (res.status === 200) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        message.success('Password Reset successfully');
        setPasswordModal(false);
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
        perAddress: userData.perAddress,
        resAddress: userData.resAddress,
        profileImage: userData.profileImage,
        gender: userData.gender,
        bloodGroup: userData.bloodGroup,
        dob: userData.dob,
        cleanliness: userData.cleanliness,
        socialHabits: userData.socialHabits,
        workOrStudyHours: userData.workOrStudyHours,
        foodPreferences: userData.foodPreferences,
        hobbies: userData.hobbies,
        personalityTraits: userData.personalityTraits,
        sleepHabits: userData.sleepHabits,
        petPreferences: userData.petPreferences,
        budget: userData.budget,
      });
    }
  }, [userData]);

  return (
    <>
      {userData && (
        <div className="user--section">
          <div className="user--profile">
            <div className="edit">
              <BiEdit className="icon" onClick={() => setPofileModal(true)} />
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

          <Modal
            title="Edit User Profile"
            centered
            open={pofileModal}
            onOk={() => setPofileModal(false)}
            onCancel={() => setPofileModal(false)}
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
          <div className="user--row">
            <div className="personal--detail">
              <div className="user--header">
                <h2>Personal Details</h2>
                <BiEdit
                  className="icon"
                  onClick={() => setPersonalModal(true)}
                />
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
                      <span>
                        {userData.bloodGroup ? userData.bloodGroup : 'NA'}
                      </span>
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
            <div className="preferences--detail">
              <div className="user--header">
                <h2>Preferences Details</h2>
                <BiEdit
                  className="icon"
                  onClick={() => setPreferenceModal(true)}
                />
              </div>

              <Modal
                title="Edit User Prefernces"
                open={preferenceModal}
                centered
                onOk={() => setPreferenceModal(false)}
                onCancel={() => setPreferenceModal(false)}
                width={650}
              >
                <Form
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  style={{ marginTop: '2rem' }}
                >
                  <Row style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item
                      name="cleanliness"
                      label="Cleanliness"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the cleanliness preference',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Cleanliness'}
                        placeholder="Select Cleanliness"
                        style={{ width: 180 }}
                      >
                        <Option value="Very Clean">Very Clean</Option>
                        <Option value="Clean">Clean</Option>
                        <Option value="Moderate">Moderate</Option>
                        <Option value="Messy">Messy</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="socialHabits"
                      label="Social Habits"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the social habits preference',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Social Habits'}
                        placeholder="Select Social Habits"
                        style={{ width: 180 }}
                      >
                        <Option value="Very Social">Very Social</Option>
                        <Option value="Social">Social</Option>
                        <Option value="Introverted">Introverted</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="workOrStudyHours"
                      label="Work or Study Hours"
                      rules={[
                        {
                          required: true,
                          message:
                            'Please select the work or study hours preference',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Work or Study Hours'}
                        placeholder="Select Work or Study Hours"
                        style={{ width: 180 }}
                      >
                        <Option value="Morning Person">Morning Person</Option>
                        <Option value="Night Owl">Night Owl</Option>
                      </Select>
                    </Form.Item>
                  </Row>

                  <Row style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item
                      name="foodPreferences"
                      label="Food Preferences"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the food preferences',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Food Preferences'}
                        placeholder="Select Food Preferences"
                        style={{ width: 180 }}
                      >
                        <Option value="Vegetarian">Vegetarian</Option>
                        <Option value="Vegan">Vegan</Option>
                        <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="sleepHabits"
                      label="Sleep Habits"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the sleep habits preference',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Sleep Habits'}
                        placeholder="Select Sleep Habits"
                        style={{ width: 180 }}
                      >
                        <Option value="Early Riser">Early Riser</Option>
                        <Option value="Night Owl">Night Owl</Option>
                        <Option value="Regular">Regular</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="petPreferences"
                      label="Pet Preferences"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the pet preferences',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        value={'Select Pet Preferences'}
                        placeholder="Select Pet Preferences"
                        style={{ width: 180 }}
                      >
                        <Option value="Likes Pets">Likes Pets</Option>
                        <Option value="No Pets">No Pets</Option>
                      </Select>
                    </Form.Item>
                  </Row>
                  <Form.Item
                    name="hobbies"
                    label="Hobbies"
                    rules={[
                      {
                        required: true,
                        message: 'Please select at least one hobby',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      placeholder="Select Hobbies"
                      style={{ width: '100%' }}
                    >
                      <Option value="Reading">Reading</Option>
                      <Option value="Gaming">Gaming</Option>
                      <Option value="Sports">Sports</Option>
                      <Option value="Music">Music</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="personalityTraits"
                    label="Personality Traits"
                    rules={[
                      {
                        required: true,
                        message: 'Please select at least one personality trait',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      mode="multiple"
                      placeholder="Select Personality Traits"
                      style={{ width: '100%' }}
                    >
                      <Option value="Friendly">Friendly</Option>
                      <Option value="Organized">Organized</Option>
                      <Option value="Adventurous">Adventurous</Option>
                      <Option value="Easygoing">Easygoing</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="budget"
                    label="Budget"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Budget',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <div className="preferences">
                <div className="pref-col">
                  <div className="cleanliness">
                    <h4>Cleanliness</h4>
                    <span>
                      {userData.cleanliness ? userData.cleanliness : 'NA'}
                    </span>
                  </div>
                  <div className="socialHabits">
                    <h4>Social Habits</h4>
                    <span>
                      {userData.socialHabits ? userData.socialHabits : 'NA'}
                    </span>
                  </div>
                  <div className="workOrStudyHours">
                    <h4>Work or Study Hours</h4>
                    <span>
                      {userData.workOrStudyHours
                        ? userData.workOrStudyHours
                        : 'NA'}
                    </span>
                  </div>
                </div>
                <div className="pref-col">
                  <div className="hobbies">
                    <h4>Hobbies</h4>
                    <span>
                      {userData.hobbies ? userData.hobbies + '' : 'NA'}
                    </span>
                  </div>
                  <div className="foodPreferences">
                    <h4>Food Preferences</h4>
                    <span>
                      {userData.foodPreferences
                        ? userData.foodPreferences
                        : 'NA'}
                    </span>
                  </div>
                  <div className="personalityTraits">
                    <h4>Personality Traits</h4>
                    <span>
                      {userData.personalityTraits
                        ? userData.personalityTraits + ''
                        : 'NA'}
                    </span>
                  </div>
                </div>
                <div className="pref-col">
                  <div className="sleepHabits">
                    <h4>Sleep Habits</h4>
                    <span>
                      {userData.sleepHabits ? userData.sleepHabits : 'NA'}
                    </span>
                  </div>
                  <div className="petPreferences">
                    <h4>Pet Preferences</h4>
                    <span>
                      {userData.petPreferences ? userData.petPreferences : 'NA'}
                    </span>
                  </div>
                  <div className="budget">
                    <h4>Budget</h4>
                    <span>
                      {userData.budget
                        ? `Rs${userData.budget.toLocaleString()}`
                        : 'NA'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
