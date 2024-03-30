import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style/selectionLevels.css';
import { useLanguage } from './LanguageProvider';


const levels = [
    { id: 0, name: 'Tutorial', difficulty: '0', image: 'https://via.placeholder.com/300' },
    { id: 1, name: 'If', difficulty: '1', image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'While', difficulty: '1', image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'For loop', difficulty: '2', image: 'https://via.placeholder.com/300' },
    { id: 4, name: 'Switch', difficulty: '2', image: 'https://via.placeholder.com/300' },
    { id: 5, name: 'Linear list', difficulty: '3', image: 'https://via.placeholder.com/300' },
    { id: 6, name: 'Array', difficulty: '3', image: 'https://via.placeholder.com/300' },
    { id: 7, name: 'Linked list', difficulty: '4', image: 'https://via.placeholder.com/300' },
    { id: 8, name: 'Stack', difficulty: '4', image: 'https://via.placeholder.com/300' },
    { id: 9, name: 'Queue', difficulty: '4', image: 'https://via.placeholder.com/300' },
    { id: 10, name: 'Tree', difficulty: '5', image: 'https://via.placeholder.com/300' },
    { id: 11, name: 'Graph', difficulty: '5', image: 'https://via.placeholder.com/300' },
];

function Stars({ count }) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(i < count ? "★" : "☆");
    }
    return <p>{stars.join(" ")}</p>;
}

const LevelCard = ({ level }) => {
    const handlePlayClick = () => {
        // Handle play button click here
        console.log(`Play button clicked for level ${level.id}`);
    };
    const { translate } = useLanguage(); // Use the hook here

    return (
        <div className="level-card">
            <img src={level.image} alt={level.name} />
            <h2>{level.name}</h2>
            <Stars count={level.difficulty} />
            <button onClick={handlePlayClick}>{translate('play')}</button>
        </div>
    );
};

function SelectionLevels() {
    const { translate } = useLanguage(); // Use the hook here
    const [fadeOut, setFadeOut] = useState(false);
    const handleBackClick = () => {
        setFadeOut(true);
        setTimeout(() => {
            window.history.back();
        }, 800);
    };
    return (
        <div>
            <button onClick={handleBackClick} class='back-button'>{translate('back')}</button>
            <h1>{translate('levels')}</h1>
            <div className="levels-container">
                {levels.map(level => (
                    <LevelCard key={level.id} level={level} />
                ))}
            </div>
            <div className={`fade-out ${fadeOut ? 'active' : ''}`} />
        </div>
    );
}

export default SelectionLevels;