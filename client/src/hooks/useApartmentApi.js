// apartmentApi.js
import { useState, useEffect } from 'react';

const useApartmentApi = () => {
  const userToken = localStorage.getItem('token');
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setApartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user apartments:', error);
        setLoading(false);
      });
  };

  const addApartment = (values, onSuccess) => {
    fetch('http://localhost:1337/apartment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSuccess();
      })
      .catch((error) => {
        console.error('Error creating apartment:', error);
      });
  };

  const updateApartment = (apartmentId, values, onSuccess) => {
    fetch(`http://localhost:1337/apartment/${apartmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSuccess();
      })
      .catch((error) => {
        console.error('Error updating apartment:', error);
      });
  };

  const deleteApartment = (apartmentId, onSuccess) => {
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
        onSuccess();
      })
      .catch((error) => {
        console.error('Error deleting apartment:', error);
      });
  };

  useEffect(() => {
    fetchUserApartments();
  }, []);

  return {
    apartments,
    loading,
    fetchUserApartments,
    addApartment,
    updateApartment,
    deleteApartment,
  };
};

export default useApartmentApi;
