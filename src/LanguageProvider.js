import React, { createContext, useContext } from "react";

const translations = {
    en: {
        start: "Start Game",
        continue: "Continue",
        selectLevels: "Select Levels",
        languages: "Languages",
        back: "Back",
        levels: "Levels",
        play: "Play",
        // other translations...
    },

    zh: {
        start: "开始游戏",
        continue: "继续游戏",
        selectLevels: "选择关卡",
        languages: "切换语言",
        back: "返回",
        play: "进入",
    },
    // fr: {
    //     start: "Démarrer le jeu",
    //     continue: "Continuer",
    //     selectLevels: "Sélectionner un niveau",
    //     languages: "Langues",
    //     back: "Retour",
    //     play: "Jouer",
    // },
    // de: {
    //     start: "Spiel starten",
    //     continue: "Weiter",
    //     selectLevels: "Level auswählen",
    //     languages: "Sprachen",
    //     back: "Zurück",
    //     play: "Spielen",
    // },
    sv: {
        start: "Starta spel",
        continue: "Fortsätt",
        selectLevels: "Välj nivåer",
        languages: "Språk",
        back: "Tillbaka",
        play: "Spela",
    },
};
const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export class LanguageProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLanguage: "en",
            translate: (key) => translations[this.state.currentLanguage][key] || key,
        };
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(languageCode) {
        this.setState({ currentLanguage: languageCode });
    }

    render() {
        return (
            <LanguageContext.Provider value={{ ...this.state, changeLanguage: this.changeLanguage }}>
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}