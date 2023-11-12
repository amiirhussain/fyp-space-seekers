import React, { useState, useEffect } from 'react';
import '../styles/List.css';
import { SiZerodha } from 'react-icons/si';
import { FaLocationDot, FaBath, FaBed } from 'react-icons/fa6';
import { Button, Space } from 'antd';
const ListApartment = () => {
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
    <section className="list--section">
      <h2 className="section--title">Latest Listed Rooms</h2>
      <div className="home--list--container">
        {apartments.map((item) => (
          <div key={item._id} className="apartment--list">
            <div className="list--image">
              <img src={item.imageUrls[0]} alt={item.title} />
            </div>

            <div className="list-detail">
              <h2 className="list-title">{item.title}</h2>

              <div
                className={`list-status ${
                  item.isAvailble ? 'list-status-true' : 'list-status-false'
                }`}
              >
                {item.isAvailble ? 'Available' : 'Not Available'}
              </div>

              <div className="list-type">{item.type}</div>
              <span className="apartment-address">
                <FaLocationDot className="icon" /> {item.address}
              </span>
              <div className="apartment-detail">
                <span>
                  <SiZerodha className="icon" />
                  {item.size}
                </span>
                <span>
                  <FaBed className="icon" />
                  {`${item.bedrooms} Bed`}
                </span>
                <span>
                  <FaBath className="icon" />
                  {`${item.bathrooms} Bath`}
                </span>
              </div>

              <div className="divider"></div>

              <div className="apartment-about">
                <div className="apartment-rent">
                  <span className="rent--slogan">Start from</span>
                  <span className="rent-mount">
                    Rs15,499 <span>/mo*</span>
                  </span>
                </div>

                <Space className="list--action">
                  <Button type="primary">Chat</Button>
                  <Button>Schedule a visit</Button>
                </Space>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListApartment;
