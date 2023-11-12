import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import ApartList from './ApartList';

const UserApartment = ({ handleEdit }) => {
  const userToken = localStorage.getItem('token');
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserApartments();
  }, []);

  const fetchUserApartments = () => {
    fetch('http://localhost:1337/apartment/by-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('API endpoint not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Apartments data:', data);
        setApartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user apartments:', error);
        setLoading(false);
      });
  };

  // delete
  const handleDelete = (apartmentId) => {
    fetch(`http://localhost:1337/apartment/${apartmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the apartment list after deletion
        fetchUserApartments();
        message.success('Apartment deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting apartment:', error);
      });
  };

  return (
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
  );
};

export default UserApartment;
