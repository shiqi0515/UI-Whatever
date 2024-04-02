import React from 'react';
import './style/Footer.css'; 

const Footer = () => {
  const year = new Date().getFullYear(); 

  return (
    <footer className="footer">
      <div className="footer-content">
        © {year} UI-WHATEVER. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;