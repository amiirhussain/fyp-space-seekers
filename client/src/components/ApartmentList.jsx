import React, { useState, useEffect } from 'react';
import '../styles/apartList.css';
import ApartList from './ApartList';

const AppartmentList = () => {
  const [userToken] = useState(localStorage.getItem('token'));
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = () => {
    fetch('http://localhost:1337/apartment/get-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
        setLoading(false);
      });
  };

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
        <h2 style={{ color: 'gray' }}>All Apartment List</h2>
      </div>

      <div>
        {loading ? (
          <p>Loading apartments...</p>
        ) : (
          <ApartList apartments={apartments} />
        )}
      </div>
    </div>
  );
};

export default AppartmentList;
