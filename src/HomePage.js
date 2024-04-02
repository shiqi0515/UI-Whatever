import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/homePage.css';
import startSound from './sounds/game-start.mp3'
import continueSound from './sounds/game-start.mp3';
import selectLevelSound from './sounds/select-level.mp3';
import changeLanguageSound from './sounds/change-language.mp3';
import { useLanguage } from './LanguageProvider';
import Footer from './Footer';
import Banner from './Banner';
import startIcon from './icons/Start.png';
import continueIcon from './icons/continue.png';
import languageIcon from './icons/language.png';
import selectIcon from './icons/select.png';

function HomePage() {
    let navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);
    const startSoundRef = useRef();
    const continueSoundRef = useRef();
    const selectLevelSoundRef = useRef();
    const changeLanguageSoundRef = useRef();

    const startGame = (event) => {
        startSoundRef.current.src = startSound;
        startSoundRef.current.load();
        startSoundRef.current.oncanplaythrough = () => {
            startSoundRef.current.play();
            setFadeOut(true);
            setTimeout(() => {
                navigate('/level0');
            }, 800);
        };
    };

    const continueGame = (event) => {
        continueSoundRef.current.src = continueSound;
        continueSoundRef.current.load();
        continueSoundRef.current.oncanplaythrough = () => {
            continueSoundRef.current.play();
            setFadeOut(true);
            setTimeout(() => {
                navigate('/level0');
            }, 800);
        };
    };

    const selectLevel = (event) => {
        selectLevelSoundRef.current.src = selectLevelSound;
        selectLevelSoundRef.current.load();
        selectLevelSoundRef.current.oncanplaythrough = () => {
            selectLevelSoundRef.current.play();
            setFadeOut(true);
            setTimeout(() => {
                navigate('/selectionLevels');
            }, 800);
        };
    };

    const changeLanguage = (event) => {
        changeLanguageSoundRef.current.src = changeLanguageSound;
        changeLanguageSoundRef.current.load();
        changeLanguageSoundRef.current.oncanplaythrough = () => {
            changeLanguageSoundRef.current.play();
            setFadeOut(true);
            setTimeout(() => {
                navigate('/selectLanguages');
            }, 800);
        };
    };



    const { translate } = useLanguage(); // Use the hook here

    return (
        <div className="home-page">
            <Banner/>

            <div className='mainPart'>

            
            <span>Smart Programmer</span> 

            <button onClick={startGame}>
                <img src={startIcon} alt="Start"/>
                {translate('start')}
            </button>

            <button onClick={continueGame}>
                <img src={continueIcon} alt="Continue"/>         
                {translate('continue')}
            </button>

            <button onClick={selectLevel}>
                <img src={selectIcon} alt="Select"/>  
                {translate('selectLevels')}
            </button>

            <button onClick={changeLanguage}> 
                <img src={languageIcon} alt="Language"/>  
                {translate('languages')}
            </button>
            <audio ref={startSoundRef} />
            <audio ref={continueSoundRef} />
            <audio ref={selectLevelSoundRef} />
            <audio ref={changeLanguageSoundRef} />
            <div className={`fade-out ${fadeOut ? 'active' : ''}`} />
            </div>
            
            <Footer/>
        </div>
    );


};

export default HomePage;
