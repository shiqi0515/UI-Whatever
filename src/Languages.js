import React, { useState } from 'react';
import './style/languages.css';
import englishImage from './images/English.jpg';
import chineseImage from './images/Chinese.png';
import frenchImage from './images/French.png';
import germanImage from './images/German.png';
import swedishImage from './images/Swedish.png';
import { useLanguage } from './LanguageProvider';

const languages = [
    { id: 0, name: 'English', image: englishImage, code: 'en' },
    { id: 1, name: 'Chinese', image: chineseImage, code: 'zh' },
    { id: 2, name: 'French', image: frenchImage, code: 'fr' },
    { id: 3, name: 'German', image: germanImage, code: 'de' },
    { id: 4, name: 'Swedish', image: swedishImage, code: 'sv' },
];

const LanguageCard = ({ language }) => {
    const { changeLanguage } = useLanguage(); // Use the hook here
    const handleLanguageClick = () => {
        changeLanguage(language.code);
    };

    return (
        <div className="language-card" onClick={handleLanguageClick}>
            <img src={language.image} alt={language.name} />
        </div>
    );
}

function Languages() {
    const [fadeOut, setFadeOut] = useState(false);
    const { translate } = useLanguage(); // Use the hook here
    const handleBackClick = () => {
        setFadeOut(true);
        setTimeout(() => {
            window.history.back();
        }, 800);
    };
    return (
        <div>
            <button onClick={handleBackClick} class='back-button'>{translate('back')}</button>
            <h1>{translate('languages')}</h1>
            <div className="languages-container">
                {languages.map(language => (
                    <LanguageCard key={language.id} language={language} />
                ))}
            </div>
            <div className={`fade-out ${fadeOut ? 'active' : ''}`} />
        </div>
    );
}

export default Languages;