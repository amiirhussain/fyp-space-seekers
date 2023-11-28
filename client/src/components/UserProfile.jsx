import React, { useEffect, useState } from 'react';
import { Form, message, Skeleton } from 'antd';
import '../styles/userProfile.css';
import UserInfo from './UserInfo';
import UserPersonalDetail from './UserPersonalDetail';
import UserPreferencesDetail from './UserPreferencesDetail';

const UserProfile = () => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const userID = userData._id;
  const [pofileModal, setPofileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [personalModal, setPersonalModal] = useState(false);
  const [preferenceModal, setPreferenceModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const passwordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [form] = Form.useForm();

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
          setLoading(false);
          console.log('Data Fetched:', data);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    getUserProfile();
  }, [token]);

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
      <div className="user--section">
        {loading ? (
          <Skeleton active />
        ) : (
          <UserInfo
            userData={userData}
            passwordError={passwordError}
            passwordModal={passwordModal}
            passwordValidator={passwordValidator}
            setPasswordModal={setPasswordModal}
            profileModal={pofileModal}
            setProfileModal={setPofileModal}
            form={form}
            resetPassword={resetPassword}
            onFinish={onFinish}
          />
        )}

        <div className="user--row">
          {loading ? ( // Render Skeleton while loading
            <Skeleton active />
          ) : (
            <UserPersonalDetail
              userData={userData}
              personalModal={personalModal}
              setPersonalModal={setPersonalModal}
              onFinish={onFinish}
              form={form}
            />
          )}

          {loading ? ( // Render Skeleton while loading
            <Skeleton active />
          ) : (
            <UserPreferencesDetail
              userData={userData}
              preferenceModal={preferenceModal}
              setPreferenceModal={setPreferenceModal}
              onFinish={onFinish}
              form={form}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
