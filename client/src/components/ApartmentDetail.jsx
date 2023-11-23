import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/apartmentDetail.css';
import { SiZerodha } from 'react-icons/si';
import { FaBed, FaBath, FaWifi } from 'react-icons/fa';

const ApartmentDetail = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function getApartmentByID() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:1337/apartment/${id}`);
        if (res.status === 404) throw new Error('List not found');

        if (res.status === 200) {
          const data = await res.json();

          console.log(data);
          setApartment(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    }

    getApartmentByID();
  }, []);

  return (
    <section className="apartment--detail">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="title-header">
            <h1 className="apart-title">{apartment.title}</h1>
            <span className="type">{apartment.type}</span>
          </div>
          <p>{apartment.address}</p>
          <img
            className="apart-image"
            src={apartment.imageUrls[0]}
            alt={apartment.title}
          />
          <span className="apart-avail">
            {apartment.isAvailble ? 'Available' : 'Not Available'}
          </span>

          <div className="apart-rent">
            <span className="rent-slogan">Start from</span>
            <span className="rent-mount">
              {apartment.rent
                ? `Rs${apartment.rent.toLocaleString()}`
                : 'Rs15,499 '}
              <span>/mo*</span>
            </span>
          </div>

          <div className="apart-detail">
            <span>
              <SiZerodha className="icon" />
              {apartment.size}
            </span>
            <span>
              <FaBed className="icon" />
              {`${apartment.bedrooms} Bed`}
            </span>
            <span>
              <FaBath className="icon" />
              {`${apartment.bathrooms} Bath`}
            </span>
          </div>

          <h4>Amenities</h4>
          <div className="apart-amentites">
            <span>Air Conditiong</span>
            <span>Attach Washroom</span>
            <span>Spacious Cupboard</span>
          </div>
          <h4>Services</h4>
          <div className="apart-services">
            <span>Hot and Delicious Meals</span>
            <span>High-Speed WIFI</span>
            <span>Laundry Service</span>
            <span>Washing Machine</span>
          </div>
        </>
      )}
    </section>
  );
};

export default ApartmentDetail;
