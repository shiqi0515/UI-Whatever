import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import './style/Header.css';

const Header = ({ title }) => {
  const { translate } = useLanguage(); // Use the hook here
  const [fadeOut, setFadeOut] = useState(false);
  const handleBackClick = () => {
    setFadeOut(true);
    setTimeout(() => {
        window.history.back();
    }, 800);
};

  // const handleSecondButtonClick = () => {
  //   // 第二个按钮的事件处理逻辑
  // };

  return (
    <header>
      <h1>{title}</h1>
      <button className="back_button" onClick={handleBackClick}>{translate('back')}</button>
      <div className={`fade-out ${fadeOut ? 'active' : ''}`} />
    </header>
  );
};

export default Header;