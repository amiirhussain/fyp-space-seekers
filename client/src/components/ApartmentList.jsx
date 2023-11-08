import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import '../styles/apartList.css';

const AppartmentList = () => {
  const [userToken] = useState(localStorage.getItem('token'));
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = () => {
    fetch('http://localhost:1337/apartment', {
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
    <List
      className="list--container"
      itemLayout="vertical"
      dataSource={apartments}
      renderItem={(apartment) => (
        <List.Item key={apartment._id}>
          <div className="apartment--list">
            <div className="list--image">
              <img src={apartment.imageUrls[0]} alt={apartment.title} />
            </div>

            <div className="list-detail">
              <h2 className="list-title">{apartment.title}</h2>
              <p>Type: {apartment.type}</p>
              <p>Address: {apartment.address}</p>
              <p>Size: {apartment.size} sq. ft</p>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default AppartmentList;
