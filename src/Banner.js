import React from 'react';
import './style/Banner.css'; 
import Logo from './icons/promo.png';

const Banner = () => {
  return (
    <div className="banner">
      <div className='bannerLogo'>
        <img className="Logo" src={Logo} alt="Logo"  /> 
      </div>
      
    </div>
  );
};

export default Banner;