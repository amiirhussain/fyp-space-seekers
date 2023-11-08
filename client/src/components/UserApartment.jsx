import React, { useState, useEffect } from 'react';
import { List } from 'antd';

const UserApartment = () => {
  const userToken = localStorage.getItem('token');
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserApartments();
  }, []);

  const fetchUserApartments = () => {
    console.log('Fetching user apartments...');

    fetch('http://localhost:1337/apartment', {
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

  return (
    <div>
      {loading ? (
        <p>Loading apartments...</p>
      ) : (
        <List
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
                  <p>
                    Avail: {apartment.isAvailble ? 'Availble' : 'Not Availble'}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default UserApartment;
