import React, { useState, FC } from "react";
import { useLanguage } from "./LanguageProvider";
import "./style/Header.css";

const Header: FC<{ title: string }> = ({ title }) => {
  const { translate } = useLanguage(); // Use the hook here
  const [fadeOut, setFadeOut] = useState(false);
  const handleBackClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      window.history.back();
    }, 800);
  };

  return (
    <header>
     
      <button className="back_button" onClick={handleBackClick}>
        {translate("back")}
      </button>
      <h1>{title}</h1>
      <div className={`fade-out ${fadeOut ? "active" : ""}`} />
    </header>
  );
};

export default Header;
