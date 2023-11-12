import React from 'react';
import { Hero } from '../components/Hero';

import ListApartment from '../components/HomeList';
import CustomFooter from '../components/Footer';

const Home = () => {
  return (
    <div style={{ padding: '0 10%' }}>
      <Hero />
      <ListApartment />
      <CustomFooter />
    </div>
  );
};

export default Home;
