import React from 'react';
import { Hero } from '../components/Hero';

import ListApartment from '../components/HomeList';
import CustomFooter from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ListApartment />
      <CustomFooter />
    </div>
  );
};

export default Home;
