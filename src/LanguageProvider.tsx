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
    tutorial: "Tutorial",
    if: "If",
    while: "While",
    for_loop: "For Loop",
    switch: "Switch",
    linear_list: "Linear List",
    array: "Array",
    linked_list: "Linked List",
    stack: "Stack",
    queue: "Queue",
    tree: "Tree",
    graph: "Graph",
    ruleTutorial:
      "Rules of the game: Drop the basketball to the red square, then move the player to the green square to win! Use the arrow keys to move the player and the basketball.",
    // other translations...
  },

  zh: {
    start: "开始游戏",
    continue: "继续游戏",
    selectLevels: "选择关卡",
    languages: "切换语言",
    back: "返回",
    levels: "关卡",
    play: "进入",
    tutorial: "教程",
    if: "If条件",
    while: "While循环",
    for_loop: "For循环",
    switch: "Switch条件",
    linear_list: "线性表",
    array: "数组",
    linked_list: "链表",
    stack: "栈",
    queue: "队列",
    tree: "树",
    graph: "图",
  },

  sv: {
    start: "Starta spel",
    continue: "Fortsätt",
    selectLevels: "Välj nivåer",
    languages: "Språk",
    back: "Tillbaka",
    play: "Spela",
    tutorial: "Handledning",
    if: "If",
    while: "While cykel",
    for_loop: "For cykel",
    switch: "Switch",
    linear_list: "Linjär lista",
    array: "Matris",
    linked_list: "Länkad lista",
    stack: "Stack",
    queue: "Kö",
    tree: "Träd",
    graph: "Graf",
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
