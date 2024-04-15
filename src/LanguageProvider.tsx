import React, { createContext, useContext, useState } from "react";

type LanguageCode = "en" | "zh" | "sv";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
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

interface LanguageContextProps {
  currentLanguage: LanguageCode;
  translate: (key: string) => string;
  changeLanguage: (languageCode: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

interface LanguageContextValue {
  currentLanguage: LanguageCode;
  translate: (key: string) => string;
  changeLanguage: (languageCode: LanguageCode) => void;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const translate = (key: string) => translations[currentLanguage][key] || key;

  const changeLanguage = (languageCode: LanguageCode) => {
    setCurrentLanguage(languageCode);
  };

  return (
    <LanguageContext.Provider
      value={
        { currentLanguage, translate, changeLanguage } as LanguageContextValue
      }
    >
      {children}
    </LanguageContext.Provider>
  );
};
